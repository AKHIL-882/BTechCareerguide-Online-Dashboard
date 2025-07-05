<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize()
    {
        // Adjust authorization as needed.
        return true;
    }

    public function rules()
    {
        return [
            'project_name' => 'required|string|max:255',
            'days_to_complete' => 'required|integer',
            'technical_skills' => 'required|string',
            'project_description' => 'required|string',
            'file' => 'required|file|max:1024000',
        ];
    }

    public function messages()
    {
        return [
            'project_name.required' => 'The project name is required.',
            'days_to_complete.required' => 'The days to complete field is required.',
            'technical_skills.required' => 'The technical skills field is required.',
            'project_description.required' => 'The project description is required.',
            'file.required' => 'A project file is required.',
            'file.max' => 'The file must not be larger than 100MB.',
        ];
    }
}
