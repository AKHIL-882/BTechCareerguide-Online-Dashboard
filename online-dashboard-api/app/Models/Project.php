<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use App\Http\Resources\AllProjectsResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
            $query->where('project_name', 'like', '%' . $searchItem . '%')->orWhere('company_name', 'like', '%' . $searchItem . '%');
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
