<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductReviewGallery extends Model
{
    protected $fillable = [
        'product_review_id',
        'image',
    ];

    public function productReview(): BelongsTo
    {
        return $this->belongsTo(ProductReview::class);
    }
}
