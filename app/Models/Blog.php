<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'user_id',
        'category_id',
        'image',
        'title',
        'slug',
        'description',
        'seo_title',
        'seo_description',
        'status'
    ];
}
