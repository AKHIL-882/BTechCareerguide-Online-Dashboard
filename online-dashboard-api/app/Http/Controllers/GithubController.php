<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGithubUsernameRequest;
use App\Models\User;
use App\Services\GithubService;
use Illuminate\Http\Request;

class GithubController extends Controller
{
    protected GithubService $githubService;

    public function __construct(GithubService $githubService)
    {
        $this->githubService = $githubService;
    }

    public function storeUserGithubId(StoreGithubUsernameRequest $request, User $user)
    {
        $data = $request->validated();

        return $this->githubService->storeUserGithubId($user, $data['github_username']);
    }

    public function addCollaboratorToRepo(Request $request)
    {
        return $this->githubService->addCollaborator(
            $request->username,
            $request->email,
            $request->repo
        );
    }
}
