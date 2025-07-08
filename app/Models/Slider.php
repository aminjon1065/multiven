<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'banner',
        'type',
        'title',
        'starting_price',
        'btn_url',
        'serial',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
