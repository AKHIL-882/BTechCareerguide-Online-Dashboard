<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_name' => $this->project->user->name,
            'user_email' => $this->project->user->email,
            'project_name' => $this->project->company_name ?? $this->project->project_name,
            'payment_document_name' => $this->getFile($this->payment_document_name),
        ];
    }

    public function getFile($document_name): mixed
    {
        $fileName = basename($document_name);
        if (Storage::disk('public')->exists('userPaymentFiles/'.$fileName)) {
            return Storage::disk('public')->url('userPaymentFiles/'.$fileName);
        } else {
            return 'File Not Found';
        }
    }
}
