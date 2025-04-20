<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'role' => $this->role,
            'degree' => $this->degree,
            'batch' => $this->batch,
            'apply_link' => $this->apply_link,
            'ctc' => $this->ctc,
            'company_logo' => $this->company_logo,
            'location' => $this->location,
        ];
    }
}
