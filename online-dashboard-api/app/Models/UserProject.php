<?php

namespace App\Models;

use App\Http\Resources\UserProjectsResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class UserProject extends Project
{
    public static function extractRequestData($request, $filePath = ''): array
    {
        return [
            'project_name' => $request->project_name,
            'technical_skills' => $request->technical_skills,
            'project_description' => $request->project_description,
            'days_to_complete' => $request->days_to_complete,
            'document_name' => $filePath,
            'user_id' => $request->user_id,
        ];
    }

    public static function createProject($request)
    {

        $fileName = time().'-'.$request->file('file')->getClientOriginalName();
        $filePath = $request->file('file')->storeAs('userProjectFiles', $fileName, 'public');

        self::create(self::extractRequestData($request, $filePath));
    }

    public static function updateProject($request, $id)
    {

        try {
            $userProject = self::findOrFail($id);
            $existingFile = $userProject->document_name;

            // If there's an existing file, delete it from storage to avoid duplicates from the user
            if ($existingFile && Storage::disk('public')->exists('userProjectFiles/'.$existingFile)) {
                Storage::disk('public')->delete('userProjectFiles/'.$existingFile);
            }

            $fileName = time().'-'.$request->file('file')->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('userProjectFiles', $fileName, 'public');
        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage())->response(Response::HTTP_BAD_REQUEST);
        }

        $userProject->update(self::extractRequestData($request, $filePath));
    }

    public static function showProject($id): UserProjectsResource
    {
        $userProject = self::findOrFail($id);

        return new UserProjectsResource($userProject);
    }

    public static function getAllProjects(): AnonymousResourceCollection
    {
        $user = User::findOrFail(Auth::user()->id);
        $userProjects = $user->projects()->orderBy('created_at', 'desc')->get();

        return UserProjectsResource::collection($userProjects);
    }
}
