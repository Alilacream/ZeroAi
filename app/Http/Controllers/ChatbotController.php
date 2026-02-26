<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Services\ChatBotService;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function send(Request $request)
    {
        // user request validation.
        $request->validate([
            'message' => 'required|string|max:5000',
        ]);
        // get the user input
        $message = $request->input('message');
        // make a service class
        $service = new ChatBotService;
        // using the process function
        $response = $service->process($message);
        // send json data
        return response()->json([
            'message' => $response,
        ]);
    }
}
