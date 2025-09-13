<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
use App\Http\Responses\ApiResponse;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProfileController extends Controller
{
    public function store(StoreProfileRequest $request, FileUploadService $uploader)
    {
        $user = Auth::user();

        $user->updateProfile($request->only([
            'name',
            'email',
            'phone',
            'education',
            'status',
            'experience_years',
        ]));

        if ($request->hasFile('photo')) {
            $photoData = $uploader->uploadToGoogle($request->file('photo'), 'Candidates Data', $user->name);
            $user->photo_drive_id = $photoData['id'];
            $user->photo_link = $photoData['link'];
        }

        if ($request->hasFile('resume')) {
            $resumeData = $uploader->uploadToGoogle($request->file('resume'), 'Candidates Data', $user->name);
            $user->resume_drive_id = $resumeData['id'];
            $user->resume_link = $resumeData['link'];
        }

        $user->save();

        return ApiResponse::setMessage('Account Created Successfully')
            ->mergeResults([
                'user' => $user->toArray(),
            ])
            ->response(Response::HTTP_CREATED);
    }
}
