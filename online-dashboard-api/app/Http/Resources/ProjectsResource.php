<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'company_name' => $this->company_name,
            'youtube_video_link' => $this->youtube_video_link,
            'payment_link' => $this->payment_link,
            'created_at' => $this->created_at
        ];
    }
}
