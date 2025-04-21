<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReportJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reason' => ['required', 'string', 'in:Fraud,Expiry,Link Not Working,Other'],
            'message' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'reason.in' => 'The selected reason is invalid.',
        ];
    }
}
