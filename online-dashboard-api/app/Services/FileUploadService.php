<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    public function uploadToGoogle(UploadedFile $file, string $folder, string $userName): array
    {
        $fileName = time().'_'.$file->getClientOriginalName();
        $filePath = $file->storeAs("{$folder}/{$userName}", $fileName, 'google');

        return [
            'id' => $filePath,
            'link' => Storage::disk('google')->url($filePath),
        ];
    }
}
