<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserProjectsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'project_name' => $this->project_name,
            'technical_skills' => $this->technical_skills,
            'project_description' => $this->project_description,
            'days_to_complete' => $this->days_to_complete,
            'document_name' => $this->getFile($this->document_name),
            'project_status' => $this->project_status,
            'payment_status' => $this->payment_status,
            'id' => $this->id,
            'company_name' => $this->company_name,
            'youtube_video_link' => $this->youtube_video_link,
            'payment_link' => $this->payment_link,
            'created_at' => $this->created_at,
            'user_id' => $this->user->id,
            'is_admin_project' => $this->is_admin_project,
        ];
    }

    public function getFile($document_name): mixed
    {
        $fileName = basename($document_name);
        if (Storage::disk('public')->exists('userProjectFiles/'.$fileName)) {
            return Storage::disk('public')->url('userProjectFiles/'.$fileName);
        } else {
            return 'File Not Found';
        }
    }
}
