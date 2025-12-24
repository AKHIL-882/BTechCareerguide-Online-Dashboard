<?php

namespace App\Repositories;

use App\Models\RazorpayPayment;

class RazorpayPaymentRepository
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): RazorpayPayment
    {
        return RazorpayPayment::create($data);
    }

    public function findByOrderId(string $orderId): ?RazorpayPayment
    {
        return RazorpayPayment::where('razorpay_order_id', $orderId)->first();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateStatus(RazorpayPayment $payment, array $data): void
    {
        $payment->fill($data);
        $payment->save();
    }
}
