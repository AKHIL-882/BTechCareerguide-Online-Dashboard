<?php

namespace App\Models;

use App\Http\Requests\ProjectsRequest;
use App\Http\Resources\ProjectsResource;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class Project extends Model
{

    protected $table = 'projects';

    protected $fillable = [
        'company_name',
        'youtube_video_link',
        'payment_link'
    ] ;

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ] ;

    public static function extractRequestData($request): array {
        return [
            'company_name' => $request->company_name,
            'youtube_video_link' => $request->youtube_video_link,
            'payment_link' => $request->payment_link
        ] ;
    }

    public static function createProject($request): void {
        self::create(self::extractRequestData($request)) ;
    }

    public static function updateProject($request, $id): void {
        $project = self::findOrFail($id) ;
        $project->update(self::extractRequestData($request)) ;
    }

    public static function destroyProject($id): void {
        $project = self::findOrFail($id) ;
        $project->delete() ;
    }


    public static function showProject($id): object {
        return self::findOrFail($id) ;
    }

    public static function getAllProjects(): AnonymousResourceCollection {
        $projectsList = self::all() ;

        return ProjectsResource::collection($projectsList) ;

    }


}
