<?php

namespace App\Services;

use App\Clients\GithubClient;
use App\Enums\RepoAccessStatus;
use App\Http\Responses\ApiResponse;
use App\Models\GithubUsername;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class GithubService
{
    protected GithubClient $client;

    public function __construct(GithubClient $client)
    {
        $this->client = $client;
    }

    public function storeUserGithubId(User $user, string $githubUsername)
    {
        if (! $this->client->userExists($githubUsername)) {
            return ApiResponse::setMessage('Github username not found')->response(Response::HTTP_NOT_FOUND);
        }

        GithubUsername::updateOrCreateGithubUsername(
            ['user_id' => $user->id],
            ['github_username' => $githubUsername]
        );

        // Event logging removed; add audit logging here if storing Github IDs should be tracked.

        return ApiResponse::setMessage('User Github Id Stored Successfully!!')
            ->response(Response::HTTP_OK);
    }

    public function addCollaborator(string $username, string $email, ?string $repo = null)
    {
        if (! $this->client->userExists($username)) {
            return ApiResponse::setMessage('Github username not found')->response(Response::HTTP_NOT_FOUND);
        }

        $repoAccess = $this->addCollaboratorToRepo($username, $repo)
            ? RepoAccessStatus::AccessGiven
            : RepoAccessStatus::AccessFailed;

        GithubUsername::create([
            'github_username' => $username,
            'user_id' => Auth::id(),
            'email' => $email,
            'repo_access' => $repoAccess,
        ]);

        // Event logging removed; add audit logging here if repository access changes need tracking.

        return ApiResponse::setMessage(
            $repoAccess === RepoAccessStatus::AccessGiven
                ? 'Permission granted Successfully'
                : 'Permission not granted'
        )->response(
            $repoAccess === RepoAccessStatus::AccessGiven
                ? Response::HTTP_OK
                : Response::HTTP_BAD_REQUEST
        );
    }

    public function addCollaboratorToRepo(string $username, ?string $repo = null): bool
    {
        $repoSlug = $this->normalizeRepoSlug($repo);

        return $this->client->addCollaborator($username, $repoSlug);
    }

    private function normalizeRepoSlug(?string $repo): string
    {
        if ($repo && str_contains($repo, 'github.com')) {
            $parsed = parse_url($repo);
            $path = $parsed['path'] ?? '';
            $segments = array_values(array_filter(explode('/', $path)));
            if (count($segments) >= 2) {
                return $segments[0].'/'.$segments[1];
            }
        }

        if ($repo && str_contains($repo, '/')) {
            $parts = array_values(array_filter(explode('/', $repo)));
            if (count($parts) >= 2) {
                return $parts[0].'/'.$parts[1];
            }
        }

        $owner = env('GITHUB_OWNER');
        $defaultRepo = env('GITHUB_REPO');

        return trim($owner.'/'.$defaultRepo, '/');
    }
}
