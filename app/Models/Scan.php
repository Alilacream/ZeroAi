<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Scan extends Model
{
    public function scan(Request $request)
    {
        $request->validate([
            'content' => 'required|string|min:10|max:10000',
        ]);
        $aiResult = $this->aiService->analyseText($request->input('content'));
        $scan = Scan::create([
            'user_id' => auth()->id(),
            'content' => $request->input('content'),
            'result' => $aiResult,
            'score' => $aiResult[0]['score'],
        ]);

        return back()->with('scanResult', $scan);
    }
}
