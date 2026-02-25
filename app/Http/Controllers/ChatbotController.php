<?php
// this is an api, not a specific controller
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Services\ChatBotService;
class ChatbotController extends Controller
{
        public function send(Request $request) {
        $message = $request->input('message');
        // call Ai service
        $response = ChatBotService::class->process($message);
        //returns the response
        return response()->json([
            'reply' => $response
        ]);

    }
}
