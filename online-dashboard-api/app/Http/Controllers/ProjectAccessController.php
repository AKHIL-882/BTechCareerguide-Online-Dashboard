<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Enums\RepoAccessStatus;
use App\Http\Requests\GrantProjectAccessRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Project;
use App\Models\ProjectAccess;
use App\Repositories\RazorpayPaymentRepository;
use App\Services\GithubService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ProjectAccessController extends Controller
{
    public function __construct(
        private readonly GithubService $githubService,
        private readonly RazorpayPaymentRepository $payments
    ) {}

    public function context(Project $project): JsonResponse
    {
        $project->load(['user.githubUsername']);

        $latestPayment = $this->payments->latestSuccessForProject($project->id);

        return ApiResponse::setData([
            'project_id' => $project->id,
            'project_name' => $project->project_name ?? $project->company_name,
            'user' => [
                'id' => $project->user?->id,
                'name' => $project->user?->name,
                'email' => $project->user?->email,
                'github_username' => $project->user?->githubUsername?->github_username,
            ],
            'razorpay_payment_id' => $latestPayment?->razorpay_payment_id,
            'razorpay_order_id' => $latestPayment?->razorpay_order_id,
        ])->response(Response::HTTP_OK);
    }

    public function grant(Project $project, GrantProjectAccessRequest $request): JsonResponse
    {
        $project->load(['user.githubUsername']);

        if ($project->project_status->value !== ProjectStatus::PaymentSuccess()->value) {
            return ApiResponse::setMessage('Project must have successful payment before granting access.')
                ->response(Response::HTTP_BAD_REQUEST);
        }

        $data = $request->validated();
        $githubUsername = $project->user?->githubUsername?->github_username;

        if (! $githubUsername) {
            return ApiResponse::setMessage('User GitHub username is missing. Ask the user to submit it first.')
                ->response(Response::HTTP_BAD_REQUEST);
        }

        $latestPayment = $this->payments->latestSuccessForProject($project->id);
        if (! $latestPayment) {
            return ApiResponse::setMessage('No successful Razorpay payment found for this project.')
                ->response(Response::HTTP_BAD_REQUEST);
        }

        $grantResult = $this->githubService->addCollaboratorToRepo($githubUsername, $data['repo'] ?? null);

        $status = $grantResult ? RepoAccessStatus::AccessGiven : RepoAccessStatus::AccessFailed;

        ProjectAccess::create([
            'project_id' => $project->id,
            'user_id' => $project->user_id,
            'admin_id' => $request->user()->id,
            'razorpay_payment_id' => $latestPayment?->razorpay_payment_id,
            'razorpay_order_id' => $latestPayment?->razorpay_order_id,
            'github_username' => $githubUsername,
            'github_repo' => $data['repo'],
            'status' => $status,
            'granted_at' => $status === RepoAccessStatus::AccessGiven ? now() : null,
        ]);

        if ($status === RepoAccessStatus::AccessGiven) {
            $project->project_status = ProjectStatus::Delivered;
            $project->save();
        }

        return ApiResponse::setMessage(
            $status === RepoAccessStatus::AccessGiven
                ? 'Access granted and recorded.'
                : 'GitHub collaborator request failed.'
        )->response(
            $status === RepoAccessStatus::AccessGiven
                ? Response::HTTP_OK
                : Response::HTTP_BAD_REQUEST
        );
    }
}
