<?php

use App\Http\Controllers\Api\ScanHistoryController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\WaitList\LandingPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Social Authentication Routes
Route::get('auth/{provider}', [SocialiteController::class, 'redirectToProvider'])
    ->where('provider', 'github|google')
    ->name('auth.provider');
Route::get('auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback'])
    ->where('provider', 'github|google')
    ->name('auth.provider.callback');

// Email Verification Routes
Route::get('/email/verify', function () {
    return Inertia::render('auth/verify-email', [
        'status' => session('status'),
    ]);
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed'])
    ->name('verification.verify');

Route::post('/email/verify-resend', [VerifyEmailController::class, 'resend'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.resend');

//
// Scan history api
Route::post('/api/scans/history', [ScanHistoryController::class, 'store']);
// Dashboard
Route::get('dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Chat
Route::get('chat', function () {
    return Inertia::render('chat');
})->middleware(['auth', 'verified'])
    ->name('chat');

Route::post('chat', [ChatbotController::class, 'send'])
    ->middleware(['auth', 'verified']);

// Verification route
Route::get('verify', function () {
    return Inertia::render('verify');
})
    ->middleware(['auth', 'verified']);
Route::post('verify', VerifyController::class)
    ->name('verify');

// Waitlist
Route::get('waitlist', LandingPageController::class)->name('waitlist');
Route::post('waitlist', [LandingPageController::class, 'store'])->name('waitlist.store');

require __DIR__.'/settings.php';
