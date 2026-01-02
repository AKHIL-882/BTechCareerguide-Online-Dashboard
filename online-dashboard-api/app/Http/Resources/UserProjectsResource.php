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
            'payment_amount' => $this->payment_amount,
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
        if (! $document_name) {
            return null;
        }

        $fileName = basename($document_name);
        $publicPath = 'userProjectFiles/'.$fileName;

        if (Storage::disk('public')->exists($publicPath)) {
            return Storage::disk('public')->url($publicPath);
        }

        if (Storage::disk('public')->exists($document_name)) {
            return Storage::disk('public')->url($document_name);
        }

        try {
            if (Storage::disk('google')->exists($document_name)) {
                return Storage::disk('google')->url($document_name);
            }
        } catch (\Throwable $e) {
            // If the driver cannot generate a URL, fall through to the raw path.
        }

        return $document_name;
    }
}
