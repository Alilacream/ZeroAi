<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ScanController;
use Illuminate\Support\Facades\Route;

Route::post('/chat', [ChatbotController::class, 'send']);

Route::post('/scans', [ScanController::class, 'analyze']);
