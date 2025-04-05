<?php

namespace App\Models;

use Throwable;
use App\Enums\UserEventLogType;
use App\Http\Responses\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\UserProjectsResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserProject extends Project
{
    public static function createProject($request): void
    {
        $fileName = time() . '-' . $request->file('file')->getClientOriginalName();
        $filePath = $request->file('file')->storeAs('userProjectFiles', $fileName, 'public');

        self::create([
            'project_name' => $request->project_name,
            'technical_skills' => $request->technical_skills,
            'project_description' => $request->project_description,
            'days_to_complete' => $request->days_to_complete,
            'document_name' => $filePath,
            'user_id' => Auth::id(),
            'is_admin_project' => 0,
        ]);

        UserEventLog::createLog(UserEventLogType::getDescription(UserEventLogType::ProjectRequested));
    }

    public static function updateProject($request, $id): mixed
    {
        try {
            $userProject = self::findOrFail($id);

            // Delete existing file if it exists
            if ($userProject->document_name && Storage::disk('public')->exists($userProject->document_name)) {
                Storage::disk('public')->delete($userProject->document_name);
            }

            $fileName = time() . '-' . $request->file('file')->getClientOriginalName();
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
