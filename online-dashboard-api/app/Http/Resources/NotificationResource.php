<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'update' => $this->update,
            'notification_image' => $this->notification_image,
            'created_at' => $this->created_at,
            'is_read' => $this->pivot->is_read ?? false, // Assuming you have a pivot table
        ];
    }
}
