<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'purpose' => 'required|string|in:signup,login',
            'code'    => 'required|string|digits_between:4,8',
            'transaction_id' => 'nullable|string',
            'email' => 'nullable|email',
        ];
    }
}
