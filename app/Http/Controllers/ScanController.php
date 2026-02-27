<?php

namespace App\Http\Controllers;

use App\Models\Scan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScanController extends Controller
{
    /**
     * Store a new scan result.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'type' => 'required|string|in:image,video,text',
            'filename' => 'nullable|string',
            'label' => 'nullable|string',
            'score' => 'required|numeric',
            'result' => 'nullable|array',
        ]);

        $scan = Scan::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'filename' => $request->filename,
            'label' => $request->label,
            'score' => $request->score,
            'result' => $request->result,
        ]);

        return response()->json([
            'message' => 'Scan result saved successfully',
            'scan' => $scan,
        ], 201);
    }
}
