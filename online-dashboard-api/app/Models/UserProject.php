<?php

namespace App\Models;

use App\Http\Resources\UserProjectsResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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

        $fileName = time().'-'.$request->file('file')->getClientOriginalName();
        $filePath = $request->file('file')->storeAs('userProjectFiles', $fileName, 'public');
        $userProject = self::findOrFail($id);
        $userProject->update(self::extractRequestData($request, $filePath));
    }

    public static function showProject($id): UserProjectsResource
    {
        $userProject = self::findOrFail($id);

        return new UserProjectsResource($userProject);
    }

    public static function getAllProjects(): AnonymousResourceCollection
    {
        $userProjects = self::all();

        return UserProjectsResource::collection($userProjects);
    }
}
