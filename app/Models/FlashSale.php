<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class FlashSale extends Pivot
{
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'status' => 'boolean',
    ];
}
