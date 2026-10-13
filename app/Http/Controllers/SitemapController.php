<?php

namespace App\Http\Controllers;

use App\Support\PublicSeo;

class SitemapController extends Controller
{
    public function index()
    {
        // Google largely ignores sitemap priority and changefreq. Dates here
        // refer to known content revisions, not today's request timestamp.
        $lastmod = [
            '/' => '2026-10-13',
            '/about' => '2026-10-13',
            '/services' => '2025-01-01',
            '/solutions' => '2026-07-06',
            '/top-it-company-sadiqabad' => '2026-07-03',
            '/best-software-house-pakistan' => '2026-10-13',
            '/benefits' => '2026-07-27',
            '/careers' => '2025-01-01',
            '/contact' => '2025-01-01',
            '/ceo' => '2026-10-13',
            '/founder' => '2026-10-13',
            '/company-registration' => '2026-09-24',
            '/updates' => '2026-10-12',
            '/privacy-policy' => '2025-01-01',
            '/terms' => '2025-01-01',
            '/refund-policy' => '2025-01-01',
            '/cookie-policy' => '2025-01-01',
            '/disclaimer' => '2025-01-01',
        ];

        $pages = [];
        foreach (PublicSeo::pages() as $path => $details) {
            $pages[] = [
                'loc' => PublicSeo::ORIGIN.($path === '/' ? '/' : $path),
                'lastmod' => $lastmod[$path] ?? null,
            ];
        }
        return response()->view('sitemap', compact('pages'))
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
