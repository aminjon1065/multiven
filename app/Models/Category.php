<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    public function SubCategories(): HasMany
    {
        return $this->hasMany(SubCategory::class);
    }

    public function childCategories(): HasMany
    {
        return $this->hasMany(ChildCategory::class);
    }
}
