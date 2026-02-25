<?php

namespace App\Http\Controllers;

use App\Services\HuggingFaceService;
use Illuminate\Http\Request;

class ChatStreamController extends Controller
{
    public function __construct(protected HuggingFaceService $aiService) {}

    public function __invoke(Request $request)
    {
        $content = $request->input('content');

        if (! $content || strlen($content) < 10) {
            return response()->stream(function () {
                echo 'data: Error: Content must be at least 10 characters.';
                echo "\n\n";
            }, 400, [
                'Content-Type' => 'text/event-stream',
                'Cache-Control' => 'no-cache',
                'X-Accel-Buffering' => 'no',
            ]);
        }

        return response()->stream(function () use ($content) {
            $this->aiService->streamAnalysis($content, function ($chunk) {
                echo 'data: '.$chunk."\n\n";
                ob_flush();
                flush();
            });
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'X-Accel-Buffering' => 'no',
        ]);
    }
}
