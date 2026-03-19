<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Scan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\ConnectionException;
class ScanController extends Controller
{


  public function analyze(Request $request)
{
    // 1. Validate - Ensure the key 'file' matches your React FormData.append('file', ...)
    $request->validate([
        'file' => 'required|file|mimes:jpg,jpeg,png,mp4,mov,webm|max:20480', // 20MB limit
    ]);

    try {
        $file = $request->file('file');
        $endpoint = config('services.gradio.space');
        $token = config('services.huggingface.token');

        // 2. The Handshake with Hugging Face
        // We use Laravel's Http client (Guzzle wrapper) for better readability
        $response = Http::withToken($token)
            ->timeout(120) // Critical: High timeout for "Cold Starts"
            ->attach(
                'data[0]',
                file_get_contents($file->getRealPath()),
                $file->getClientOriginalName()
            )
            ->post($endpoint);

        // 3. Handle API-level errors (401, 404, 503, etc.)
        if ($response->failed()) {
            Log::error("HF Space Error: " . $response->body());
            return response()->json([
                'error' => 'The AI Engine is currently unavailable or busy.',
                'details' => $response->json('error') ?? 'Check server logs.'
            ], $response->status());
        }

        $result = $response->json();

        // 4. Extract Data (Gradio usually returns an array in 'data')
        if (!isset($result['data'][0])) {
            throw new \Exception("The AI returned an empty or malformed result.");
        }

        $scanData = $result['data'][0];

        // 5. Save to Database
        // We wrap this in a separate try-catch if you want to be safe
        $scan = Scan::create([
            'user_id' => Auth::id(),
            'filename' => $file->getClientOriginalName(),
            'type' => $file->getMimeType(),
            // Ensure your 'results' column is 'json' or 'text' in the migration
            'results' => $scanData,
        ]);

        // Return the scan data so the frontend can update the UI
        return response()->json([
            'id' => $scan->id,
            'data' => $scanData
        ]);

    } catch (ConnectionException $e) {
        return response()->json(['error' => 'Connection timed out. The AI space might be sleeping.'], 504);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error("ScanController Error: " . $e->getMessage());
        return response()->json([
            'error' => 'Internal Server Error',
            'message' => $e->getMessage()
        ], 500);
    }
}
}
