<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Change as per authentication requirements
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'title' => 'required|string|max:255',
        ];
    }

    /**
     * Customize error messages.
     */
    public function messages(): array
    {
        return [
            'date.required' => 'The booking date is required.',
            'date.date' => 'The date must be a valid format.',
            'time.required' => 'The booking time is required.',
            'time.date_format' => 'The time format must be HH:MM.',
            'title.required' => 'The title is required.',
            'title.string' => 'The title must be a valid string.',
            'title.max' => 'The title must not exceed 255 characters.',
        ];
    }
}
