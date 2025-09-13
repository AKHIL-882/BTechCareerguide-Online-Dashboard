<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'education' => $this->education,
            'status' => $this->status,
            'experience_years' => $this->experience_years,
            'photo_drive_id' => $this->photo_drive_id,
            'photo_link' => $this->photo_link,
            'resume_drive_id' => $this->resume_drive_id,
            'resume_link' => $this->resume_link,
            'drive_folder_id' => $this->drive_folder_id,
            'role' => $this->roles->pluck('name')->first(),
            'stats' => $this->getUserJobStats(),
        ];
    }
}
