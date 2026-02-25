<?php

use function Pest\Laravel\post;


namespace App\Http\Controllers\Services;

use Illuminate\Support\Facades\Http;


class ChatBotService {
    protected string $apikey;
    protected string $baseUrl;
    public function __construct()
    {
         $this->apikey = config('model.api_model');
         $this->baseUrl = config('model.api_model_url');
    }
    public function test(): string {
        Http::withHeaders([
            'Authorization' => 'Bearer'.config('model.api_model'),
            'content_type' => 'application/json'
        ])->post('https://api.openai.com/v1/chat/comple ');
    }

    public function process(string $message): string {

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '. $this->apikey,
            'content_type' => 'application/json',
        ])->post($this->baseUrl, '/chat/completions', [
                'model' => 'openrouter/free',
                'messages' => [
                    'role' => 'system',
                    'content' => "You're a helpful assitant inside a SaaS app",
                ],

                [
                    'role' => 'user',
                    'content' => $message
                ]
            ]);

        if ($response->successful()) {
        return $response->json()['choices'][0]['message']['content'] ?? 'No response.';
        }
        return 'Ai service is temporarily unavailable';
    }
}

?>

