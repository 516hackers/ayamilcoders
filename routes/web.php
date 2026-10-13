<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';

// ===== PUBLIC PAGES =====
// All public pages use the same Inertia root view (app.blade.php).
// Mixing public.blade.php with app.blade.php caused first-visit/head asset
// inconsistency across Inertia visits, particularly on mobile. Auth pages
// already use app.blade.php; keep the shared shell stable.


// Sitemap
Route::get('/sitemap.xml', [App\Http\Controllers\SitemapController::class, 'index']);

// Home page
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// About page
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Services page
Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

// Contact page
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Careers page
Route::get('/careers', function () {
    return Inertia::render('Careers');
})->name('careers');

// ===== LEGAL PAGES =====

// Privacy Policy page
Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

// Terms & Conditions page
Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');


Route::get('/refund-policy', function () {
    return Inertia::render('RefundPolicy');
})->name('refund-policy');


// Cookie Policy page
Route::get('/cookie-policy', function () {
    return Inertia::render('CookiePolicy');
})->name('cookie-policy');

// Disclaimer page
Route::get('/disclaimer', function () {
    return Inertia::render('Disclaimer');
})->name('disclaimer');


// CEO page
Route::get('/ceo', function () {
    return Inertia::render('Ceo');
})->name('ceo');

// Preserve old founder URL from historical search traffic without duplicate content.
Route::redirect('/about/muhammad-muzamil', '/founder', 301);

// Founder page — NOT linked from navbar/footer/legal sheet on purpose.
// Reachable only via direct URL: /founder
Route::get('/founder', function () {
    return Inertia::render('Founder');
})->name('founder');

// Top IT Company in Sadiqabad — local SEO landing page.
// This one IS meant to be discoverable: linked in the footer and
// included in the sitemap (unlike /founder above).
Route::get('/top-it-company-sadiqabad', function () {
    return Inertia::render('TopItCompanySadiqabad');
})->name('sadiqabad-it-company');


Route::get('/solutions', function () {
    return Inertia::render('Solutions');
})->name('solutions');

// Client Benefits page — footer-only, not in main nav.
// Makes the case to potential clients for why they should choose
// Ayamil Coders (track record, pricing, support terms, etc).
Route::get('/benefits', function () {
    return Inertia::render('Benefits');
})->name('benefits');

// Public, SEO-indexable 13-month development retrospective.
Route::get('/updates', function () {
    return Inertia::render('Updates');
})->name('updates');

// National SEO / reputation landing page — targets "best software
// house in Pakistan" search intent, distinct from the local
// /top-it-company-sadiqabad page. Linked in footer + sitemap.
Route::get('/best-software-house-pakistan', function () {
    return Inertia::render('BestSoftwareHousePakistan');
})->name('best-software-house-pakistan');

Route::get('/company-registration', function () {
    return Inertia::render('CompanyRegistration');
})->name('company-registration');
