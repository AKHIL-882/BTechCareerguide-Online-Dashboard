<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSlideRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'button' => 'nullable|string|max:255',
            'link' => 'nullable|string|max:255',
            'image' => 'nullable|string|max:255',
            'youtube_video_link' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
        ];
    }
}
