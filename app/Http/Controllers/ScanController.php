<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ScanController extends Controller
{
    public function analyze(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,webp|max:10240',
        ]);

        $file = $request->file('file');
        $mimeType = $file->getMimeType();
        $base64Data = base64_encode(file_get_contents($file->getRealPath()));
        $dataUri = "{$mimeType};base64,{$base64Data}";

        $hfToken = env('HF_TOKEN');
        if (! $hfToken) {
            return response()->json(['message' => 'HF_TOKEN missing in .env'], 500);
        }

        try {
            // Use your NEW space URL
            $baseUrl = 'https://alilacream-truthseeker.hf.space/gradio_api/call/predict_deepfake';

            Log::info('Submitting job to Gradio...', ['mime' => $mimeType]);

            // --- STEP 1: SUBMIT ---
            $submitResponse = Http::withHeaders([
                'Authorization' => "Bearer {$hfToken}",
                'Content-Type' => 'application/json',
            ])->post($baseUrl, [
                'data' => [$dataUri],
                'fn_index' => 0,
            ]);

            if ($submitResponse->failed()) {
                throw new \Exception('Submit failed: '.$submitResponse->body());
            }

            $submitData = $submitResponse->json();

            if (! isset($submitData['event_id'])) {
                if (isset($submitData['data'])) {
                    return $this->parseResult($submitData);
                }
                throw new \Exception('No event_id received.');
            }

            $eventId = $submitData['event_id'];
            Log::info('Job submitted. Event ID: '.$eventId);

            // --- STEP 2: POLL ---
            $maxAttempts = 60;
            $attempt = 0;
            $finalResult = null;

            while ($attempt < $maxAttempts) {
                sleep(2);
                $attempt++;

                // Correct Polling URL with Event ID
                $pollUrl = "{$baseUrl}/{$eventId}";

                $pollResponse = Http::withHeaders([
                    'Authorization' => "Bearer {$hfToken}",
                ])
                    ->timeout(60) // Increased timeout for polling
                    ->get($pollUrl);

                if ($pollResponse->successful()) {
                    $pollData = $pollResponse->json();

                    if (isset($pollData['msg']) && $pollData['msg'] === 'process_completed') {
                        $finalResult = $pollData;
                        break;
                    }

                    if (isset($pollData['data'])) {
                        $finalResult = $pollData;
                        break;
                    }
                }
            }

            if (! $finalResult) {
                throw new \Exception('Timeout: Model took too long.');
            }

            return $this->parseResult($finalResult);

        } catch (\Exception $e) {
            Log::error('Scan Failed', ['error' => $e->getMessage()]);

            return response()->json([
                'message' => 'Analysis Failed',
                'error' => $e->getMessage(),
            ], 503);
        }
    }

    /**
     * Parse the EXACT structure returned by your space:
     * data: [ { label: "...", confidences: [ {label, confidence}, ... ] } ]
     */
    private function parseResult($result)
    {
        $data = $result['data'] ?? null;

        if (! $data || ! is_array($data) || count($data) === 0) {
            throw new \Exception('Invalid result structure: empty data');
        }

        // Step 1: Get the first item in the data array
        // Structure: [ { label: "AI_Generated", confidences: [...] } ]
        $predictionWrapper = $data[0];

        if (! is_array($predictionWrapper)) {
            throw new \Exception('Invalid result structure: expected array at data[0]');
        }

        // Step 2: Extract the main label
        $mainLabel = $predictionWrapper['label'] ?? 'Unknown';

        // Step 3: Extract the highest confidence from the 'confidences' array
        $confidencesList = $predictionWrapper['confidences'] ?? [];
        $topConfidence = 0.0;
        $topLabel = $mainLabel;

        if (is_array($confidencesList) && count($confidencesList) > 0) {
            foreach ($confidencesList as $item) {
                $score = (float) ($item['confidence'] ?? 0);
                if ($score > $topConfidence) {
                    $topConfidence = $score;
                    $topLabel = $item['label'] ?? $mainLabel;
                }
            }
        }

        // Step 4: Format for your React Frontend
        // Your frontend expects: { label: "...", confidences: [{label, confidence}, ...] }
        return response()->json([
            'label' => $topLabel, // e.g., "AI_Generated"
            'confidences' => $confidencesList, // Pass the whole array for the UI cards
            'raw_score' => $topConfidence,
        ]);
    }
}
