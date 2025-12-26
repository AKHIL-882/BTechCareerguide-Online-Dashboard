<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProfileRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'education' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'in:Fresher,Experienced'],
            'experience_years' => ['nullable', 'integer', 'min:0', 'max:60'],
            'photo' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:51200'],
            'resume' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'skills' => ['nullable', 'array'],
            'skills.*' => ['string', 'max:100'],
            'headline' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:2000'],
            'location' => ['nullable', 'string', 'max:255'],
            'links' => ['nullable', 'array'],
            'links.*.label' => ['nullable', 'string', 'max:100'],
            'links.*.url' => ['nullable', 'url', 'max:500'],
            'education_entries' => ['nullable', 'array'],
            'education_entries.*.school' => ['nullable', 'string', 'max:255'],
            'education_entries.*.degree' => ['nullable', 'string', 'max:255'],
            'education_entries.*.field' => ['nullable', 'string', 'max:255'],
            'education_entries.*.start_year' => ['nullable', 'string', 'max:25'],
            'education_entries.*.end_year' => ['nullable', 'string', 'max:25'],
            'experience_entries' => ['nullable', 'array'],
            'experience_entries.*.company' => ['nullable', 'string', 'max:255'],
            'experience_entries.*.role' => ['nullable', 'string', 'max:255'],
            'experience_entries.*.start_date' => ['nullable', 'string', 'max:50'],
            'experience_entries.*.end_date' => ['nullable', 'string', 'max:50'],
            'experience_entries.*.description' => ['nullable', 'string', 'max:2000'],
            'projects' => ['nullable', 'array'],
            'projects.*.title' => ['nullable', 'string', 'max:255'],
            'projects.*.description' => ['nullable', 'string', 'max:2000'],
            'projects.*.link' => ['nullable', 'url', 'max:500'],
            'publications' => ['nullable', 'array'],
            'publications.*.title' => ['nullable', 'string', 'max:255'],
            'publications.*.publisher' => ['nullable', 'string', 'max:255'],
            'publications.*.date' => ['nullable', 'string', 'max:50'],
            'publications.*.link' => ['nullable', 'url', 'max:500'],
            'certifications' => ['nullable', 'array'],
            'certifications.*.title' => ['nullable', 'string', 'max:255'],
            'certifications.*.issuer' => ['nullable', 'string', 'max:255'],
            'certifications.*.year' => ['nullable', 'string', 'max:25'],
        ];
    }
}
