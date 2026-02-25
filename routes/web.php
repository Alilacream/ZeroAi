<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ChatStreamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Dashboard
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Chat
Route::get('chat', ChatController::class)->middleware(['auth', 'verified'])->name('chat');

Route::post('chat', [ChatStreamController::class])
    ->middleware(['auth', 'verified'])->name('chat.store');

require __DIR__.'/settings.php';
