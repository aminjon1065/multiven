<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariantItem extends Model
{
    protected $fillable = [
        'product_variant_id',
        'name',
        'price',
        'is_default',
        'status',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'status' => 'boolean',
        'price' => 'float',
    ];

    public function productVariant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class,  'product_variant_id', 'id');
    }

}
