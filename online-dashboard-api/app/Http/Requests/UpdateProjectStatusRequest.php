<?php

namespace App\Http\Requests;

use App\Enums\ProjectStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for updating a project's status.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'project_id' => ['required', 'exists:projects,id'],
            'project_status' => ['required', 'integer', Rule::in(ProjectStatus::getValues())],
            'payment_amount' => [
                'nullable',
                'numeric',
                'min:1',
                Rule::requiredIf(fn () => (int) $this->input('project_status') === ProjectStatus::AwaitingPayment),
            ],
        ];
    }
}
