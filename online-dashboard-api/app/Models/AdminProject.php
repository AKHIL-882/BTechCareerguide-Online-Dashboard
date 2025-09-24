<?php

namespace App\Models;

use App\Http\Resources\AdminProjectsResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

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
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject filterBySearch($searchItem)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereDaysToComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereIsAdminProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject wherePaymentLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereProjectDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereProjectStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereTechnicalSkills($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereYoutubeVideoLink($value)
 * @mixin \Eloquent
 */
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
