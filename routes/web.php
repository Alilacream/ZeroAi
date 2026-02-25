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

<<<<<<< HEAD
// Chat
Route::get('chat', ChatController::class)->middleware(['auth', 'verified'])->name('chat');
=======
// SeekerAI
Route::get('seekerai', function () {
    return Inertia::render('seekerai');
})->middleware(['auth', 'verified'])->name('seekerai');
>>>>>>> parent of a5b742f (Facing a devious bug, don't know how to if the request is being sent or not, is it being handeled or not, does the ui does not wanna show it or not.)

Route::post('chat', [ChatStreamController::class])
    ->middleware(['auth', 'verified'])->name('chat.store');

require __DIR__.'/settings.php';
