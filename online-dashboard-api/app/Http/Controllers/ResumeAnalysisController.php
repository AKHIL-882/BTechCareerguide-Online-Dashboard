<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\JobApplication;
use App\Models\JobOpportunity;
use App\Traits\ParseFileTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ResumeAnalysisController extends Controller
{
    use ParseFileTrait;

    /**
     * Return jobs from last 7 days ranked by relevance to the uploaded resume.
     */
    public function resumeBasedJobs(Request $request)
    {
        $request->validate([
            'resume' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ]);

        $user = $request->user();
        $resumeText = $this->parseResume($request->file('resume')->getRealPath());
        $resumeText = Str::lower($resumeText);

        $appliedJobIds = JobApplication::where('user_id', $user->id)
            ->pluck('job_opportunity_id')
            ->toArray();

        $jobs = JobOpportunity::where('created_at', '>=', now()->subDays(7))
            ->orderByDesc('created_at')
            ->get();

        $ranked = $jobs->map(function (JobOpportunity $job) use ($resumeText, $appliedJobIds) {
            $score = $this->scoreJob($resumeText, $job);

            return [
                'id' => $job->id,
                'company_name' => $job->company_name,
                'role' => $job->role,
                'batch' => $job->batch,
                'degree' => $job->degree,
                'branch' => $job->branch,
                'location' => $job->location,
                'job_type' => $job->job_type,
                'experience' => $job->experience,
                'ctc' => $job->ctc,
                'apply_link' => $job->apply_link,
                'company_logo' => $this->resolveLogoUrl($job->company_logo),
                'created_at' => $job->created_at,
                'match_score' => $score,
                'applied' => in_array($job->id, $appliedJobIds, true),
            ];
        })->sortByDesc('match_score')->values();

        return ApiResponse::setData($ranked)->response(Response::HTTP_OK);
    }

    public function markApplied(Request $request, JobOpportunity $job)
    {
        $user = $request->user();

        JobApplication::updateOrCreate(
            ['user_id' => $user->id, 'job_opportunity_id' => $job->id],
            ['status' => 'applied', 'applied_at' => now()]
        );

        return ApiResponse::setMessage('Job marked as applied')->response(Response::HTTP_OK);
    }

    private function scoreJob(string $resumeText, JobOpportunity $job): int
    {
        $keywords = collect([
            $job->role,
            $job->degree,
            $job->branch,
            $job->job_type,
        ])->filter()->flatMap(function ($value) {
            return collect(explode(',', $value))->flatMap(function ($piece) {
                return explode(' ', trim($piece));
            });
        })->map(fn ($token) => Str::of($token)->trim()->lower())->filter()->values();

        $score = 0;

        foreach ($keywords as $keyword) {
            if ($keyword->isNotEmpty() && Str::contains($resumeText, (string) $keyword)) {
                $score++;
            }
        }

        return $score;
    }

    private function resolveLogoUrl(?string $logo): ?string
    {
        if (! $logo) {
            return null;
        }

        if (Str::startsWith($logo, ['http://', 'https://'])) {
            return $logo;
        }

        return Storage::disk('public')->url($logo);
    }
}
