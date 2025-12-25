<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use App\Http\Resources\AllProjectsResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string|null $company_name
 * @property string|null $youtube_video_link
 * @property string|null $payment_link
 * @property int $user_id
 * @property string|null $project_name
 * @property string|null $technical_skills
 * @property string|null $project_description
 * @property int|null $days_to_complete
 * @property string|null $document_name
 * @property int $project_status
 * @property int $payment_status
 * @property int|null $is_admin_project
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \BenSampo\Enum\Enum $status
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project filterBySearch($searchItem)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDaysToComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereIsAdminProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project wherePaymentLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereProjectDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereProjectStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTechnicalSkills($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereYoutubeVideoLink($value)
 *
 * @mixin \Eloquent
 */
class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

    protected $fillable = [
        'company_name',
        'youtube_video_link',
        'payment_link',
        'user_id',
        'is_admin_project',
        'project_name',
        'technical_skills',
        'project_description',
        'days_to_complete',
        'document_name',
        'project_status',
        'payment_status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'status' => ProjectStatus::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public static function showAllProjects($userId)
    {
        $projects = self::where('user_id', $userId)
            ->orWhere('is_admin_project', true)
            ->orderBy('created_at', 'desc')->get();

        return AllProjectsResource::collection($projects);
    }

    /**
     * Scope for filtering by project_name.
     */
    public function scopeFilterBySearch($query, $searchItem)
    {
        if ($searchItem) {
            $query->where('project_name', 'like', '%'.$searchItem.'%')->orWhere('company_name', 'like', '%'.$searchItem.'%');
        }

        return $query;
    }

    public static function searchProject($request)
    {
        if (empty($request->input('search_item'))) {
            return collect([]);
        }

        return self::query()
            ->filterBySearch($request->input('search_item'))
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
