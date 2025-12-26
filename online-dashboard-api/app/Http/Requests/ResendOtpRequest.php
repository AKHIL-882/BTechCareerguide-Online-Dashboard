<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResendOtpRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'purpose' => 'required|string|in:signup,login',
            'email' => 'required_without:user_id|email',
            'user_id' => 'required_without:email|integer|exists:users,id',
        ];
    }
}
