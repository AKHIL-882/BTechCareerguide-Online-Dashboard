<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'feedback' => 'sometimes|required|string',
            'job_role' => 'sometimes|required|string',
            'company' => 'sometimes|required|string',
        ];
    }
}
