<?php

namespace App\Models;

use App\Http\Resources\JobResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class JobOpportunity extends Model
{

    use HasFactory ;

    protected $table = 'job_opportunities';

    protected $fillable = [
        'company_name',
        'role',
        'batch',
        'apply_link',
        'qualification',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function extractRequestData($request): array
    {
        return $data = [
            'company_name' => $request->company_name,
            'role' => $request->role,
            'batch' => $request->batch,
            'apply_link' => $request->apply_link,
            'qualification' => $request->qualification,
        ];
    }

    public static function createJob($request): object
    {

        return self::create(self::extractRequestData($request));

    }

    public static function updateJob($request, $id)
    {
        $job = self::findOrFail($id);
        $job->update(self::extractRequestData($request));

    }

    public static function destroyJob($id)
    {
        $job = self::findOrFail($id);
        $job->delete();
    }

    public static function showJob($id): Collection
    {
        return self::findOrFail($id);
    }

    public static function getAllJobs(): mixed
    {
        try {
            $jobsList = self::all();
        return JobResource::collection($jobsList) ;

        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage())->response(Response::HTTP_BAD_REQUEST);
        }
    }
}
