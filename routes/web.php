<?php

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
Route::get('chat', function () {
    return Inertia::render('seekerai');
})->middleware(['auth', 'verified'])->name('chat');

// ChatInterface Ui
// Route::get('/truth-seeker', function(){
// return Inertia::render(')
// })
// Analysis

require __DIR__.'/settings.php';
