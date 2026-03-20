<?php

namespace App\Http\Controllers;

use App\Models\Scan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ScanController extends Controller
{
    public function analyze(Request $request)
{
    $token = config('services.huggingface.token');
    $baseEndpoint = "https://redajdaini-truthseeker.hf.space/gradio_api/call/predict_deepfake";

    // 1. TRY THE UPLOAD FIRST (Gradio 4+ usually requires this)
    $file = $request->file('file');
    $uploadUrl = str_replace('/call/predict_deepfake', '/upload', $baseEndpoint);

    $upload = Http::withToken($token)
        ->attach('files', file_get_contents($file->getRealPath()), $file->getClientOriginalName())
        ->post($uploadUrl);

    if (!$upload->successful()) {
        return response()->json(['step' => 'UPLOAD_FAILED', 'raw' => $upload->body()], 500);
    }

    $remotePath = $upload->json(0); // The path on HF servers

    // 2. TRIGGER THE PREDICTION
    $post = Http::withToken($token)->post($baseEndpoint, [
        'data' => [
            [
                'path' => $remotePath,
                'meta' => ['_type' => 'gradio.FileData']
            ]
        ]
    ]);

    $eventId = $post->json('event_id');

    // 3. GET THE RAW STREAM (No polling loop yet, just one check)
    sleep(4); // Give the model a head start
    $result = Http::withToken($token)->get("{$baseEndpoint}/{$eventId}");

    return response()->json([
        'debug_step_1_upload' => $remotePath,
        'debug_step_2_event'  => $eventId,
        'debug_step_3_raw_sse' => $result->body()
    ]);
}
}
