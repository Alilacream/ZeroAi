<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ChatController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('chat');
    }
}
