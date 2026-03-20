<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use \App\Http\Controllers\VerifyController;
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Dashboard
Route::get('dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Chat
Route::get('chat', function () {
    return Inertia::render('chat');
})->middleware(['auth', 'verified'])
    ->name('chat');

Route::post('chat', [ChatbotController::class, 'send']);

// Verification route
Route::get('verify', function() {
    return Inertia::render('verify');
})
->middleware(['auth', 'verified'])
;
Route::post('verify', VerifyController::class)
    ->name('verify');

require __DIR__.'/settings.php';
