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
            'skills',
            'profile_meta',
        ]) + [
            'profile_meta' => [
                'headline' => $request->input('headline'),
                'summary' => $request->input('summary'),
                'location' => $request->input('location'),
                'links' => $request->input('links', []),
                'education' => $request->input('education_entries', []),
                'experience' => $request->input('experience_entries', []),
                'projects' => $request->input('projects', []),
                'publications' => $request->input('publications', []),
                'certifications' => $request->input('certifications', []),
            ],
        ]);

        // if ($request->hasFile('photo')) {
        //     $photoData = $uploader->uploadToGoogle($request->file('photo'), 'Candidates Data', $user->name);
        //     $user->photo_drive_id = $photoData['id'];
        //     $user->photo_link = $photoData['link'];
        // }

        // if ($request->hasFile('resume')) {
        //     $resumeData = $uploader->uploadToGoogle($request->file('resume'), 'Candidates Data', $user->name);
        //     $user->resume_drive_id = $resumeData['id'];
        //     $user->resume_link = $resumeData['link'];
        // }

        $user->save();

        return ApiResponse::setMessage('Profile updated successfully')
            ->mergeResults([
                'user' => $user->toArray(),
            ])
            ->response(Response::HTTP_OK);
    }

    public function show()
    {
        $user = Auth::user();

        return ApiResponse::setData([
            'user' => $user,
        ])->response(Response::HTTP_OK);
    }
}
