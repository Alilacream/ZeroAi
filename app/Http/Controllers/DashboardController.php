<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Render the dashboard with real metrics.
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Fetch real stats
        $totalScans = $user->scans()->count();
        $videoScans = $user->scans()->where('type', 'video')->count();
        $imageScans = $user->scans()->where('type', 'image')->count();
        
        // Find manipulated count (where label contains 'fake')
        $manipulatedCount = $user->scans()
            ->where('label', 'like', '%fake%')
            ->count();

        // Fetch recent scans history
        $recentScans = $user->scans()
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($scan) {
                return [
                    'id' => 'SCN-' . $scan->id,
                    'filename' => $scan->filename ?? 'Unknown',
                    'type' => $scan->type,
                    'date' => $scan->created_at->diffForHumans(),
                    'status' => $scan->label,
                    'score' => $scan->score,
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => [
                'total' => $totalScans,
                'video' => $videoScans,
                'image' => $imageScans,
                'manipulated' => $manipulatedCount,
            ],
            'recentScans' => $recentScans,
        ]);
    }
}
