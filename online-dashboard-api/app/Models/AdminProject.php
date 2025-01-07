<?php

namespace App\Models;

use App\Http\Resources\AdminProjectsResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class AdminProject extends Project
{
    public static function extractRequestData($request): array
    {
        return [
            'company_name' => $request->company_name,
            'youtube_video_link' => $request->youtube_video_link,
            'payment_link' => $request->payment_link,
            'is_admin_project' => true,
            'user_id' => Auth::user()->id,
        ];
    }

    public static function createProject($request): void
    {
        self::create(self::extractRequestData($request));
    }

    public static function updateProject($request, $id): void
    {
        $project = self::findOrFail($id);
        $project->update(self::extractRequestData($request));
    }

    public static function destroyProject($id): void
    {
        $project = self::findOrFail($id);
        $project->delete();
    }

    public static function showProject($id): AdminProjectsResource
    {
        $project = self::findOrFail($id);

        return new AdminProjectsResource($project);

    }

    public static function getAllProjects(): AnonymousResourceCollection
    {
        $projectsList = self::where('is_admin_project', 1)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        return AdminProjectsResource::collection($projectsList);

    }
}
