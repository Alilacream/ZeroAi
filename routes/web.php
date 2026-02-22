<?php

use App\Http\Controllers\AnalysisController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

function AnalysisRoute()
{
    Route::post('/scan', [AnalysisController::class, 'store'])->name('scan.store');
}
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Dashboard
Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// SeekerAI
Route::get('seekerai', function () {
    return Inertia::render('seekerai');
})->middleware(['auth', 'verified'])->name('seekerai');

// ChatInterface Ui
// Route::get('/truth-seeker', function(){
// return Inertia::render(')
// })
// Analysis
Route::middleware(['auth', 'verified'])->group(AnalysisRoute());

require __DIR__.'/settings.php';
