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
