<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserProjectsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'project_name' => 'required|string',
            'technical_skills' => 'required|string',
            'project_description' => 'required|string',
            'days_to_complete' => 'required|integer',
            'file' => [
                'required',
                'file',
                'mimes:jpeg,jpg,png,pdf,doc,docx',
                'max:5120',
            ],
        ];
    }
}
