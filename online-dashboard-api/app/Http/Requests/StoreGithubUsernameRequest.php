<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGithubUsernameRequest extends FormRequest
{
    public function authorize(): bool
    {
        // You can add custom authorization logic here
        return true;
    }

    public function rules(): array
    {
        return [
            'github_username' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'github_username.required' => 'GitHub username is required.',
        ];
    }
}
