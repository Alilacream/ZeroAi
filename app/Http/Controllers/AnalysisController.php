<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Redirect;
use App\Services\HuggingFaceService;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{

    public function __construct(
       protected  HuggingFaceService $aiService
    )
    {}
    public function store(Request $request) {
        $request->validate([
            'content' => 'required|string|min:10|max:10000',
        ]);
    $result = $this->aiService->analyzeText($request->content);

    return back()->with('scanResult', $result);
    }
}
