<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $logo = $this->company_logo;
        if ($logo && ! Str::startsWith($logo, ['http://', 'https://'])) {
            $logo = Storage::disk('public')->url($logo);
        }

        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'role' => $this->role,
            'degree' => $this->degree,
            'batch' => $this->batch,
            'apply_link' => $this->apply_link,
            'ctc' => $this->ctc,
            'company_logo' => $logo,
            'location' => $this->location,
            'job_type' => $this->job_type,
            'created_at' => $this->created_at,
            'experience' => $this->experience,
            'branch' => $this->branch,
            'is_fraud' => $this->is_fraud,
            'report_reason' => $this->report_reason,
        ];
    }
}
