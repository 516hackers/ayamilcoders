<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyFinancialSnapshot;
use Illuminate\Http\JsonResponse;

class CompanyMetricsController extends Controller
{
    private const TOTAL_SHARES = 1000;
    private const FACE_VALUE_PER_SHARE = 10;

    public function shareValue(): JsonResponse
    {
        $snapshot = CompanyFinancialSnapshot::query()
            ->orderByDesc('synced_at')
            ->orderByDesc('id')
            ->first();

        if (! $snapshot) {
            return response()->json([
                'status' => 'pending',
                'currency' => 'PKR',

                'shares' => self::TOTAL_SHARES,
                'face_value_per_share' => self::FACE_VALUE_PER_SHARE,

                'total_assets' => null,
                'total_liabilities' => null,
                'net_assets' => null,
                'estimated_book_value_per_share' => null,

                'source' => null,
                'last_updated' => null,

                'message' => 'Bank/accounting API integration is not connected yet.',
            ]);
        }

        $assets = (float) $snapshot->total_assets;
        $liabilities = (float) $snapshot->total_liabilities;

        $netAssets = $assets - $liabilities;

        $bookValuePerShare = $netAssets / self::TOTAL_SHARES;

        return response()->json([
            'status' => 'connected',

            'currency' => $snapshot->currency,

            'shares' => self::TOTAL_SHARES,
            'face_value_per_share' => self::FACE_VALUE_PER_SHARE,

            'total_assets' => round($assets, 2),
            'total_liabilities' => round($liabilities, 2),
            'net_assets' => round($netAssets, 2),

            'estimated_book_value_per_share' => round(
                $bookValuePerShare,
                2
            ),

            'source' => $snapshot->source,

            'last_updated' => optional(
                $snapshot->synced_at
            )?->toIso8601String(),
        ]);
    }
}
