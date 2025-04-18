<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        info($this);

        return [
            'user_id' => 'required|exists:users,id',
            'feedback' => 'required|string',
            'job_role' => 'required|string',
            'company' => 'required|string',
        ];
    }
}
