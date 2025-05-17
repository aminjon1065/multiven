<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vendor extends Model
{
    protected $fillable = [
        'banner',
        'phone',
        'email',
        'address',
        'description',
        'fb_link',
        'whatsapp_link',
        'telegram_link',
        'instagram_link',
        'user_id',
        'status',
        'shop_name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
