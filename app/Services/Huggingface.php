<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class HuggingFaceService
{
    public function analyzeText(string $text)
    {
        // url li ghadi ykon Ai fih hosted
        $url = env('ZEROAI_MODEL_URL');
        // had l code ka yshed responce ou ka ysiftha 3la chkel json
        $response = Http::withToken(env('ZEROAI_MODEL'))
            ->post($url, ['inputs' => $text,]);
        // ghadi nshedo responce ou nkhedmo fiha f l controller: Analysis.
        return $response->json();
    }
}
