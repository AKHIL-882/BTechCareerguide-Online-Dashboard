<?php

namespace App\Models;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Resources\UserProjectsResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

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
 * @method static \Database\Factories\UserProjectFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject filterBySearch($searchItem)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereDaysToComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereIsAdminProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject wherePaymentLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereProjectDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereProjectStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereTechnicalSkills($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereYoutubeVideoLink($value)
 *
 * @mixin \Eloquent
 */
class UserProject extends Project
{
    public static function createProject(StoreProjectRequest $request)
    {
        if (! $request->hasFile('file')) {
            return ApiResponse::setMessage('No file provided.')
                ->response(Response::HTTP_BAD_REQUEST);
        }

        $file = $request->file('file');
        if (! ($file instanceof \Illuminate\Http\UploadedFile)) {
            return ApiResponse::setMessage('Invalid file.')
                ->response(Response::HTTP_BAD_REQUEST);
        }

        $fileName = time().'-'.$file->getClientOriginalName();
        $filePath = $file->storeAs('ProjPort', $fileName, 'google');

        $project = self::create([
            'project_name' => $request->project_name,
            'technical_skills' => $request->technical_skills,
            'project_description' => $request->project_description,
            'days_to_complete' => $request->days_to_complete,
            'document_name' => $filePath,
            'user_id' => Auth::id() ?? $request->user_id,
            'is_admin_project' => 0,
        ]);

        // Event logging removed; add instrumentation here if project submissions should be audited.

        return response()->json(['message' => 'Project created successfully!', 'project' => $project], 201);
    }

    public static function updateProject($request, $id): mixed
    {
        try {
            $userProject = self::findOrFail($id);

            // Delete existing file if it exists
            if ($userProject->document_name && Storage::disk('public')->exists($userProject->document_name)) {
                Storage::disk('public')->delete($userProject->document_name);
            }

            $fileName = time().'-'.$request->file('file')->getClientOriginalName();
            $filePath = $request->file('file')->storeAs('userProjectFiles', $fileName, 'public');

            $userProject->update([
                'project_name' => $request->project_name,
                'technical_skills' => $request->technical_skills,
                'project_description' => $request->project_description,
                'days_to_complete' => $request->days_to_complete,
                'document_name' => $filePath,
                'user_id' => Auth::id(),
                'is_admin_project' => 0,
            ]);

            return $userProject;
        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage())
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    public static function showProject($id): UserProjectsResource
    {
        return new UserProjectsResource(self::findOrFail($id));
    }

    public static function getAllProjects(): AnonymousResourceCollection
    {
        $userProjects = Auth::user()
            ->projects()
            ->orderBy('created_at', 'desc')
            ->get();

        return UserProjectsResource::collection($userProjects);
    }
}
