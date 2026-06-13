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



// Home page
Route::get('/', function () {
    return Inertia::render('Welcome', [], 'public');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('Contact', [], 'public');
})->name('contact');

// Careers page
Route::get('/careers', function () {
    return Inertia::render('Careers', [], 'public');
})->name('careers');

// About page
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Services page
Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

// Privacy Policy page
Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

// Terms page
Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');