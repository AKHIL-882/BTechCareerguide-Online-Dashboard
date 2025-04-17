<?php

namespace App\Models;

use App\Http\Resources\JobResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class JobOpportunity extends Model
{
    use HasFactory;

    protected $table = 'job_opportunities';

    protected $fillable = [
        'company_name',
        'role',
        'batch',
        'apply_link',
        'branch',
        'degree',
        'job_type',
        'experience',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function createJob($request): self
    {
        return self::create([
            'company_name' => $request->company_name,
            'role' => $request->role,
            'batch' => $request->batch,
            'apply_link' => $request->apply_link,
            // 'qualification' => $request->qualification,
        ]);
    }

    public static function updateJob($request, $id): void
    {
        self::findOrFail($id)->update([
            'company_name' => $request->company_name,
            'role' => $request->role,
            'batch' => $request->batch,
            'apply_link' => $request->apply_link,
            'qualification' => $request->qualification,
        ]);
    }

    public static function destroyJob($id): void
    {
        self::findOrFail($id)->delete();
    }

    public static function showJob($id): Collection
    {
        return self::findOrFail($id);
    }

    public static function getAllJobs(): mixed
    {
        try {
            return JobResource::collection(self::all());
        } catch (Throwable $e) {
            return ApiResponse::setMessage(message: $e->getMessage())
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    public static function getLatestJobs(): EloquentCollection
    {
        if (!\Schema::hasTable('job_opportunities')) {
            return new EloquentCollection(); // ✅ Correct return type
        }
    
        return self::latest()->take(3)->get();
    }
    

    // === SCOPES === //

    public function scopeBranch(Builder $query, $branch): Builder
    {
        return $query->where('qualification', $branch);
    }

    public function scopeBatch(Builder $query, $batch): Builder
    {
        return $query->where('batch', $batch);
    }

    public function scopeDegree(Builder $query, $degree): Builder
    {
        return $query->where('qualification', $degree);
    }

    public function scopeJobType(Builder $query, $jobType): Builder
    {
        return $query->where('job_type', $jobType);
    }

    public function scopeExperience(Builder $query, $experience): Builder
    {
        return $query->where('experience', '>=', $experience);
    }
}
