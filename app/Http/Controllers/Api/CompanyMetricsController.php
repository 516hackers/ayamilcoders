<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyFinancialSnapshot;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

/** Public API: audited financial snapshots and OPTIONAL limited txn cash indicator. */
class CompanyMetricsController extends Controller
{
    private const TOTAL_SHARES = 1000;
    private const FACE_VALUE_PER_SHARE = 10;

    private function ledgerCashIndicator(): array
    {
        // Opt-in: never publish private ledger data automatically.
        if (filter_var(config('ayamil_ledger.public_enabled', false), FILTER_VALIDATE_BOOLEAN) !== true) {
            return ['status' => 'disabled', 'cash_per_share' => null, 'as_of' => null, 'balance_sheet_status' => 'incomplete', 'total_assets' => null, 'total_liabilities' => null, 'net_assets' => null, 'financial_reviewed_at' => null];
        }
        $url = trim((string) config('ayamil_ledger.feed_url', ''));
        $token = trim((string) config('ayamil_ledger.feed_token', ''));
        if ($url === '' || strlen($token) < 32 || !str_starts_with($url, 'https://')) {
            return ['status' => 'unavailable', 'cash_per_share' => null, 'as_of' => null, 'balance_sheet_status' => 'incomplete', 'total_assets' => null, 'total_liabilities' => null, 'net_assets' => null, 'financial_reviewed_at' => null];
        }
        $unavailable = ['status' => 'unavailable', 'cash_per_share' => null, 'as_of' => null, 'balance_sheet_status' => 'incomplete', 'total_assets' => null, 'total_liabilities' => null, 'net_assets' => null, 'financial_reviewed_at' => null];
        try {
            // Cache success AND upstream failures briefly to avoid stampedes or
            // high CPU/database load if the private txn host goes offline.
            return Cache::remember('ayamil:ledger:cash:public:v1', 60, function () use ($url, $token, $unavailable) {
                try {
                    $response = Http::withToken($token)
                        ->acceptJson()->connectTimeout(3)->timeout(6)
                        ->withoutRedirecting()->get($url);
                    if (!$response->successful() || $response->json('ok') !== true || $response->json('currency') !== 'PKR') {
                        return $unavailable;
                    }
                    $amount = $response->json('cash_balance');
                    if (!is_numeric($amount) || !is_finite((float) $amount)) return $unavailable;
                    $asOf = $response->json('as_of');
                    return [
                        'status' => 'connected',
                        'cash_per_share' => round(((float) $amount) / self::TOTAL_SHARES, 2),
                        'as_of' => is_string($asOf) ? $asOf : null,
                        'balance_sheet_status' => $response->json('balance_sheet_status') === 'connected' ? 'connected' : 'incomplete',
                        'total_assets' => is_numeric($response->json('total_assets')) ? (float) $response->json('total_assets') : null,
                        'total_liabilities' => is_numeric($response->json('total_liabilities')) ? (float) $response->json('total_liabilities') : null,
                        'net_assets' => is_numeric($response->json('net_assets')) ? (float) $response->json('net_assets') : null,
                        'financial_reviewed_at' => $response->json('financial_reviewed_at'),
                    ];
                } catch (\Throwable $e) {
                    // Do not expose private exceptions or generate per-visitor logs.
                    return $unavailable;
                }
            });
        } catch (\Throwable $e) {
            // Cache failure must not break the publicly accessible page.
            return $unavailable;
        }
    }

    public function shareValue(): JsonResponse
    {
        $ledger = $this->ledgerCashIndicator();
        try {
            $snapshot = CompanyFinancialSnapshot::query()
                ->orderByDesc('synced_at')->orderByDesc('id')->first();
        } catch (\Throwable $e) {
            report($e);
            $snapshot = null;
        }
        $result = [
            'status' => $snapshot ? 'connected' : 'pending',
            'currency' => 'PKR',
            'shares' => self::TOTAL_SHARES,
            'face_value_per_share' => self::FACE_VALUE_PER_SHARE,
            'total_assets' => null,
            'total_liabilities' => null,
            'net_assets' => null,
            'estimated_book_value_per_share' => null,
            'source' => null,
            'last_updated' => null,
            // Cash coverage != full assets; do not call this a live share price.
            'ledger_status' => $ledger['status'],
            'ledger_cash_per_share' => $ledger['cash_per_share'],
            'ledger_as_of' => $ledger['as_of'],
            'ledger_description' => 'Cash and cash-equivalent balances / 1,000 shares (not a valuation)',
        ];
        // Prefer the same authenticated TXN feed for cash and approved balance sheet.
        if ($ledger['status'] === 'connected' && ($ledger['balance_sheet_status'] ?? null) === 'connected'
            && $ledger['total_assets'] !== null && $ledger['total_liabilities'] !== null && $ledger['net_assets'] !== null) {
            $result['status'] = 'connected';
            $result['total_assets'] = round($ledger['total_assets'], 2);
            $result['total_liabilities'] = round($ledger['total_liabilities'], 2);
            $result['net_assets'] = round($ledger['net_assets'], 2);
            $result['estimated_book_value_per_share'] = round($ledger['net_assets'] / self::TOTAL_SHARES, 2);
            $result['source'] = 'TXN ledger + reviewed balance-sheet inputs';
            $result['last_updated'] = $ledger['financial_reviewed_at'] ?? $ledger['as_of'];
            return response()->json($result)
                ->header('Cache-Control', 'private, no-store')
                ->header('X-Content-Type-Options', 'nosniff');
        }
        if (!$snapshot) {
            $result['message'] = 'Verified full financial snapshot not connected; cash indicator may be available separately.';
        } else {
            $assets = (float) $snapshot->total_assets;
            $liabilities = (float) $snapshot->total_liabilities;
            $net = $assets - $liabilities;
            $result['currency'] = $snapshot->currency;
            $result['total_assets'] = round($assets, 2);
            $result['total_liabilities'] = round($liabilities, 2);
            $result['net_assets'] = round($net, 2);
            $result['estimated_book_value_per_share'] = round($net / self::TOTAL_SHARES, 2);
            $result['source'] = $snapshot->source;
            $result['last_updated'] = optional($snapshot->synced_at)?->toIso8601String();
        }
        return response()->json($result)
            ->header('Cache-Control', 'private, no-store')
            ->header('X-Content-Type-Options', 'nosniff');
    }
}
