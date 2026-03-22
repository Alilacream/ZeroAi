<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\Api\ScanHistoryController;
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
//
//Scan history api
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

require __DIR__.'/settings.php';
