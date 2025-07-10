<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adverisement extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'value' => 'json', // Automatically decode/encode the value column
    ];
}
