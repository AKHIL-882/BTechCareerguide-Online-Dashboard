<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminProjectsResource extends JsonResource
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
            'youtube_video_link' => $this->youtube_video_link,
            'payment_link' => $this->payment_link,
            'payment_amount' => $this->payment_amount,
            'created_at' => $this->created_at,
            'user_id' => $this->user->id,
            'is_admin_project' => $this->is_admin_project,
            'project_name' => $this->project_name,
            'technical_skills' => $this->technical_skills,
            'project_description' => $this->project_description,
            'days_to_complete' => $this->days_to_complete,
            'document_name' => $this->document_name,
            'project_status' => $this->project_status,
            'payment_status' => $this->payment_status,
        ];
    }
}
