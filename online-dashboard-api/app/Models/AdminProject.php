<?php

namespace App\Models;

use App\Http\Resources\AdminProjectsResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class AdminProject extends Project
{
    public static function createProject($request): void
    {
        self::create([
            'company_name' => $request->company_name,
            'youtube_video_link' => $request->youtube_video_link,
            'payment_link' => $request->payment_link,
            'is_admin_project' => true,
            'user_id' => Auth::id(),
        ]);
    }

    public static function updateProject($request, $id): void
    {
        $project = self::findOrFail($id);

        $project->update([
            'company_name' => $request->company_name,
            'youtube_video_link' => $request->youtube_video_link,
            'payment_link' => $request->payment_link,
            'is_admin_project' => true,
            'user_id' => Auth::id(),
        ]);
    }

    public static function destroyProject($id): void
    {
        self::findOrFail($id)->delete();
    }

    public static function showProject($id): AdminProjectsResource
    {
        return new AdminProjectsResource(self::findOrFail($id));
    }

    public static function getAllProjects(): AnonymousResourceCollection
    {
        $query = self::applyRoleBasedFilter(self::orderByDesc('created_at'));

        return AdminProjectsResource::collection($query->get());
    }

    private static function getUserRole(): ?string
    {
        $user = Auth::user();

        return $user && $user->roles ? $user->roles->pluck('name')->first() : null;
    }

    private static function applyRoleBasedFilter($query)
    {
        $role = self::getUserRole();

        if ($role === 'user') {
            $query->where('is_admin_project', true)->take(6);
        } elseif ($role === 'admin') {
            $query->whereIn('is_admin_project', [0, 1]);
        }

        return $query;
    }
}
