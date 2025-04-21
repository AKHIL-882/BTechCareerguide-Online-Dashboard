<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RazorpayPayment extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'amount',
        'razorpay_payment_id',
        'razorpay_order_id',
        'status',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getStatusAttribute($value)
    {
        return (int) $value;
    }
}
