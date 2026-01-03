<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GrantProjectAccessRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'repo' => ['required', 'string', 'min:3'],
        ];
    }
}
