<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        'logo',
        'name',
        'slug',
        'is_featured',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
        'is_featured' => 'boolean',
    ];
}
