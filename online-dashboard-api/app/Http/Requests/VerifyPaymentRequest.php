<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerifyPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'project_id' => ['required', 'exists:projects,id'],
            'razorpay_payment_id' => ['required', 'string'],
            'order_id' => ['required', 'string'],
            'amount' => ['required', 'numeric', 'min:1'],
            'email' => ['nullable', 'email'],
        ];
    }
}
