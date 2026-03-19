<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Scan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'type',
        'filename',
        'content',
        'label',
        'score',
        'results',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'results' => 'array',
        'score' => 'float',
    ];

    /**
     * Get the user that owns the scan.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
