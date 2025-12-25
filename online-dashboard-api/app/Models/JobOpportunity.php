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

/**
 * @property int $id
 * @property string|null $company_name
 * @property string|null $role
 * @property string|null $batch
 * @property string|null $ctc
 * @property string|null $company_logo
 * @property string|null $location
 * @property string|null $branch
 * @property string|null $degree
 * @property string|null $job_type
 * @property string|null $experience
 * @property string|null $apply_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $is_fraud
 * @property JobReportReason|null $report_reason
 * @property string|null $report_message
 *
 * @method static Builder<static>|JobOpportunity batch($batch)
 * @method static Builder<static>|JobOpportunity branch($branch)
 * @method static Builder<static>|JobOpportunity degree($degree)
 * @method static Builder<static>|JobOpportunity experience($experience)
 * @method static \Database\Factories\JobOpportunityFactory factory($count = null, $state = [])
 * @method static Builder<static>|JobOpportunity jobType($jobType)
 * @method static Builder<static>|JobOpportunity newModelQuery()
 * @method static Builder<static>|JobOpportunity newQuery()
 * @method static Builder<static>|JobOpportunity query()
 * @method static Builder<static>|JobOpportunity whereApplyLink($value)
 * @method static Builder<static>|JobOpportunity whereBatch($value)
 * @method static Builder<static>|JobOpportunity whereBranch($value)
 * @method static Builder<static>|JobOpportunity whereCompanyLogo($value)
 * @method static Builder<static>|JobOpportunity whereCompanyName($value)
 * @method static Builder<static>|JobOpportunity whereCreatedAt($value)
 * @method static Builder<static>|JobOpportunity whereCtc($value)
 * @method static Builder<static>|JobOpportunity whereDegree($value)
 * @method static Builder<static>|JobOpportunity whereExperience($value)
 * @method static Builder<static>|JobOpportunity whereId($value)
 * @method static Builder<static>|JobOpportunity whereIsFraud($value)
 * @method static Builder<static>|JobOpportunity whereJobType($value)
 * @method static Builder<static>|JobOpportunity whereLocation($value)
 * @method static Builder<static>|JobOpportunity whereReportMessage($value)
 * @method static Builder<static>|JobOpportunity whereReportReason($value)
 * @method static Builder<static>|JobOpportunity whereRole($value)
 * @method static Builder<static>|JobOpportunity whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
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
