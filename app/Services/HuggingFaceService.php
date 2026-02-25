<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class HuggingFaceService
{
    public function analyzeText(string $text)
    {
        $url = env('ZEROAI_MODEL_URL');
        $token = env('ZEROAI_MODEL_API');

        $response = Http::withToken($token)
            ->timeout(60)
            ->withHeaders(['Content-Type' => 'application/json'])
            ->post($url, [
                'inputs' => $text,
                'options' => ['wait_for_model' => true],
            ]);

        if ($response->successful()) {
            return ['success' => $response->json()];
        }

        Log::error('ZeroAI api Error: '.$response->body());

        return ['error' => 'Connection to ZeroAi engine failed.'];
    }
}
