<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'invoice_id',
        'user_id',
        'sub_total',
        'amount',
        'currency_name',
        'currency_icon',
        'product_qty',
        'payment_method',
        'payment_status',
        'order_address',
        'shipping_method',
        'coupon',
        'order_status',
    ];

    protected $casts = [
        'invoice_id' => 'integer',
        'user_id' => 'integer',
        'sub_total' => 'double',
        'amount' => 'double',
        'currency_name' => 'string',
        'currency_icon' => 'string',
        'product_qty' => 'integer',
        'payment_method' => 'string',
        'payment_status' => 'boolean',
        'order_address' => 'json',
        'shipping_method' => 'json',
    ];

}
