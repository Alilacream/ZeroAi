<?php

namespace App\Http\Controllers;

use App\Services\HuggingFaceService;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    public function __construct(HuggingFaceService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|min:10|max:10000',
        ]);
        $result = $this->aiService->analyzeText($request->content);

        // return to the page
        // In AnalysisController.php
        return back()->with('scanResult', $result);
    }
}
