<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreScanRequest;
use App\Models\Scan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScanHistoryController extends Controller
{
    public function store(StoreScanRequest $request): JsonResponse
    {
    // Explicitly get the user from the global auth helper if request->user() fails
    $user = auth()->user();

    if (!$user) {
        // Optional: Log this to see if it's still happening
        Log::warning('Scan saved without user!');
        // For now, we allow it, but it won't show on dashboard until fixed
    }

    $scan = Scan::create([
        'user_id' => $user?->id, // Will now correctly pick up the Socialite user
        'filename' => $request->validated('filename'),
        'label' => $request->validated('label'),
        'confidence_score' => $request->validated('confidence_score'),
        'full_result' => $request->validated('full_result'),
        'type' => $request->validated('type'),
    ]);

    return response()->json([
        'message' => 'Scan saved successfully',
        'scan' => $scan,
        'debug_user_id' => $user?->id, // Check console to confirm ID is sent back
    ], 201);

    }
    public function index(Request $request): JsonResponse
    {
        $scans = Scan::query()
            ->when($request->user(), fn ($query) => $query->where('user_id', $request->user()->id))
            ->orderByDesc('created_at')
            ->limit(50)
            ->get();

        return response()->json([
            'scans' => $scans,
        ]);

    }
}
