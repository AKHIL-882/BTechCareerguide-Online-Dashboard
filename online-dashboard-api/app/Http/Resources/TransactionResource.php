<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'razorpay_payment_id' => $this->razorpay_payment_id,
            'razorpay_order_id' => $this->razorpay_order_id,
            'amount' => (float) $this->amount,
            'status' => (int) $this->status,
            'payment_method' => $this->payment_method,
            'user' => [
                'name' => $this->user?->name,
                'email' => $this->user?->email,
            ],
            'project' => [
                'id' => $this->project?->id,
                'name' => $this->project?->project_name ?? $this->project?->company_name,
            ],
            'created_at' => $this->created_at,
        ];
    }
}
