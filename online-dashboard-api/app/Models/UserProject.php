<?php

namespace App\Models;

use App\Enums\UserEventLogType;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\UserProjectsResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UserProject extends Project
{
    public static function createProject(StoreProjectRequest $request)
    {
        if (! $request->hasFile('file')) {
            return ApiResponse::setMessage('No file provided.')
                ->response(Response::HTTP_BAD_REQUEST);
        }

        $file = $request->file('file');
        if (! ($file instanceof \Illuminate\Http\UploadedFile)) {
            return ApiResponse::setMessage('Invalid file.')
                ->response(Response::HTTP_BAD_REQUEST);
        }

        $fileName = time().'-'.$file->getClientOriginalName();
        $filePath = $file->storeAs('ProjPort', $fileName, 'google');

        $project = self::create([
            'project_name' => $request->project_name,
            'technical_skills' => $request->technical_skills,
            'project_description' => $request->project_description,
            'days_to_complete' => $request->days_to_complete,
            'document_name' => $filePath,
            'user_id' => Auth::id() ?? $request->user_id,
            'is_admin_project' => 0,
        ]);

        UserEventLog::logUserEvent(
            UserEventLogType::getDescription(UserEventLogType::ProjectRequested),
            Auth::id() ?? $request->user_id,
            ['User Requested for Project !!']
        );

        return response()->json(['message' => 'Project created successfully!', 'project' => $project], 201);
    }

    public static function updateProject($request, $id): mixed
    {
        try {
            $userProject = self::findOrFail($id);

            // Delete existing file if it exists
            if ($userProject->document_name && Storage::disk('public')->exists($userProject->document_name)) {
                Storage::disk('public')->delete($userProject->document_name);
            }

            $fileName = time().'-'.$request->file('file')->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('userProjectFiles', $fileName, 'public');

            $userProject->update([
                'project_name' => $request->project_name,
                'technical_skills' => $request->technical_skills,
                'project_description' => $request->project_description,
                'days_to_complete' => $request->days_to_complete,
                'document_name' => $filePath,
                'user_id' => Auth::id(),
                'is_admin_project' => 0,
            ]);

            return $userProject;

        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage())
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    public static function showProject($id): UserProjectsResource
    {
        return new UserProjectsResource(self::findOrFail($id));
    }

    public static function getAllProjects(): AnonymousResourceCollection
    {
        $userProjects = Auth::user()
            ->projects()
            ->orderBy('created_at', 'desc')
            ->get();

        return UserProjectsResource::collection($userProjects);
    }
}
