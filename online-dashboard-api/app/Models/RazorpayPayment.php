<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int $user_id
 * @property string|null $phone
 * @property string $amount
 * @property string|null $razorpay_payment_id
 * @property string|null $razorpay_order_id
 * @property \BenSampo\Enum\Enum $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereRazorpayOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereRazorpayPaymentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereUserId($value)
 *
 * @mixin \Eloquent
 */
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
        'user_id',
    ];

    protected $casts = [
        'status' => Status::class,
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
