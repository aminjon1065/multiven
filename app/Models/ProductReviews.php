<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductReviews extends Model
{
    protected $fillable = [
        'product_id',
        'user_id',
        'vendor_id',
        'review',
        'rating',
        'status',
    ];

    protected $casts = [
        'product_id' => 'integer',
        'user_id' => 'integer',
        'vendor_id' => 'integer',
        'status' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
