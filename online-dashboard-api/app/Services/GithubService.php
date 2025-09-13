<?php

namespace App\Services;

use App\Clients\GithubClient;
use App\Enums\RepoAccessStatus;
use App\Enums\UserEventLogType;
use App\Http\Responses\ApiResponse;
use App\Models\GithubUsername;
use App\Models\User;
use App\Models\UserEventLog;
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

        UserEventLog::logUserEvent(
            UserEventLogType::getDescription(UserEventLogType::Login),
            $user->id,
            ['User Github Id Stored Successfully!!']
        );

        return ApiResponse::setMessage('User Github Id Stored Successfully!!')
            ->response(Response::HTTP_OK);
    }

    public function addCollaborator(string $username, string $email)
    {
        if (! $this->client->userExists($username)) {
            return ApiResponse::setMessage('Github username not found')->response(Response::HTTP_NOT_FOUND);
        }

        $repoAccess = $this->client->addCollaborator($username)
            ? RepoAccessStatus::AccessGiven
            : RepoAccessStatus::AccessFailed;

        GithubUsername::create([
            'github_username' => $username,
            'user_id' => Auth::id(),
            'email' => $email,
            'repo_access' => $repoAccess,
        ]);

        UserEventLog::logUserEvent(
            UserEventLogType::getDescription(
                $repoAccess === RepoAccessStatus::AccessGiven
                    ? UserEventLogType::RepoAccessGiven
                    : UserEventLogType::RepoAccessFailed
            ),
            Auth::id(),
            [$repoAccess === RepoAccessStatus::AccessGiven ? 'Access Granted' : 'Access Failed']
        );

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
}
