<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Services\ChatBotService;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        $message = $request->input('message');
        $service = new ChatBotService;
        $response = $service->process($message);

        return response()->json([
            'message' => $response,
        ]);
    }
}
