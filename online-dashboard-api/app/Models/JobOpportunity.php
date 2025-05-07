<?php

namespace App\Models;

use App\Enums\JobReportReason;
use App\Http\Resources\JobResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

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
        'ctc',
        'company_logo',
        'location',
        'is_fraud',
        'report_reason',
        'report_message',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'report_reason' => JobReportReason::class,
    ];

    public static function createJob($request): self
    {
        return self::create([
            'company_name' => $request?->company_name,
            'role' => $request?->role,
            'degree' => $request?->degree,
            'batch' => $request?->batch,
            'branch' => $request?->branch,
            'apply_link' => $request?->apply_link,
            'ctc' => $request?->ctc,
            'company_logo' => $request?->company_logo,
            'location' => $request?->location,
            'job_type' => $request?->job_type,
            'experience' => $request?->experience,
            'is_fraud' => $request?->is_fraud ?? false,
            'report_reason' => $request?->report_reason ?? null,
        ]);
    }

    public static function updateJob($request, $id): void
    {
        self::findOrFail($id)->update([
            'company_name' => $request->company_name,
            'role' => $request->role,
            'degree' => $request->degree,
            'batch' => $request->batch,
            'branch' => $request->branch,
            'apply_link' => $request->apply_link,
            'ctc' => $request->ctc,
            'company_logo' => $request->company_logo,
            'location' => $request->location,
            'job_type' => $request->job_type,
            'experience' => $request->experience,
            'is_fraud' => $request->is_fraud ?? false,
            'report_reason' => $request->report_reason ?? null,
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
        try {
            if (! Schema::hasTable('job_opportunities')) {
                return new EloquentCollection;
            }

            return self::latest()->take(3)->get();
        } catch (Throwable $e) {
            return new EloquentCollection;
        }
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

    public function reportJob($reason, $message = null): void
    {
        $this->update([
            'is_fraud' => $reason === JobReportReason::Fraud,
            'report_reason' => $reason,
            'report_message' => $message,
        ]);
    }
}
