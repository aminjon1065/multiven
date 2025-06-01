<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'code',
        'name',
        'slug',
        'thumb_image',
        'vendor_id',
        'category_id',
        'sub_category_id',
        'child_category_id',
        'brand_id',
        'qty',
        'short_description',
        'long_description',
        'video_link',
        'link_source',
        'sku',
        'price',
        'cost_price',
        'offer_price',
        'offer_start_date',
        'offer_end_date',
        'product_type',
        'status',
        'is_approved',
        'seo_title',
        'seo_description',
        'link_first',
    ];

    protected $casts = [
        'vendor_id' => 'integer',
        'category_id' => 'integer',
        'sub_category_id' => 'integer',
        'child_category_id' => 'integer',
        'brand_id' => 'integer',
        'qty' => 'integer',
        'status' => 'boolean',
        'is_approved' => 'boolean',
        'offer_start_date' => 'date',
        'offer_end_date' => 'date',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function productImageGalleries(): HasMany
    {
        return $this->hasMany(ProductImageGallery::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function childCategory(): BelongsTo
    {
        return $this->belongsTo(ChildCategory::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

}
