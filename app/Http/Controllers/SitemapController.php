<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

class SitemapController extends Controller
{
    public function index()
    {
        $pages = [
            // Main Pages
            [
                'loc' => '/',
                'lastmod' => '2025-01-01',
                'changefreq' => 'weekly',
                'priority' => '1.00'
            ],
            [
                'loc' => '/ceo',
                'lastmod' => '2025-01-01',
                'changefreq' => 'weekly',
                'priority' => '0.95'
            ],
            [
                'loc' => '/services',
                'lastmod' => '2025-01-01',
                'changefreq' => 'weekly',
                'priority' => '0.95'
            ],
            [
                'loc' => '/contact',
                'lastmod' => '2025-01-01',
                'changefreq' => 'monthly',
                'priority' => '0.90'
            ],
            [
                'loc' => '/about',
                'lastmod' => '2025-01-01',
                'changefreq' => 'monthly',
                'priority' => '0.85'
            ],
            [
                'loc' => '/careers',
                'lastmod' => '2025-01-01',
                'changefreq' => 'weekly',
                'priority' => '0.80'
            ],
            
            // Legal Pages
            [
                'loc' => '/privacy-policy',
                'lastmod' => '2025-01-01',
                'changefreq' => 'yearly',
                'priority' => '0.50'
            ],
            [
                'loc' => '/terms',
                'lastmod' => '2025-01-01',
                'changefreq' => 'yearly',
                'priority' => '0.50'
            ],
            [
                'loc' => '/refund-policy',
                'lastmod' => '2025-01-01',
                'changefreq' => 'yearly',
                'priority' => '0.45'
            ],
            [
                'loc' => '/cookie-policy',
                'lastmod' => '2025-01-01',
                'changefreq' => 'yearly',
                'priority' => '0.45'
            ],
            [
                'loc' => '/disclaimer',
                'lastmod' => '2025-01-01',
                'changefreq' => 'yearly',
                'priority' => '0.40'
            ],
        ];

        $sitemap = view('sitemap', ['pages' => $pages])->render();

        return response($sitemap, 200)
            ->header('Content-Type', 'application/xml');
    }
}