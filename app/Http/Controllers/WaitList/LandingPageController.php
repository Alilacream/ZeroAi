<?php

namespace App\Http\Controllers\WaitList;

use App\Http\Controllers\Controller;
use App\Http\Requests\WaitlistStoreRequest;
use App\Models\WaitListEntry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    /**
     * Display the waitlist landing page.
     */
    public function __invoke()
    {
        return Inertia::render('waitlist');
    }

    /**
     * Store a new email in the waitlist.
     */
    public function store(WaitlistStoreRequest $request): RedirectResponse
    {
        WaitListEntry::create(['email' => $request->email]);

        return back()->with('success', "You're on the list. We'll be in touch.");
    }
}
