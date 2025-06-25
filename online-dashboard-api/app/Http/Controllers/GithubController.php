<?php

namespace App\Http\Controllers;

use App\Enums\RepoAccessStatus;
use App\Enums\UserEventLogType;
use App\Http\Requests\StoreGithubUsernameRequest;
use App\Http\Responses\ApiResponse;
use App\Models\GithubUsername;
use App\Models\User;
use App\Models\UserEventLog;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class GithubController extends Controller
{
    public $client;

    public function __construct()
    {
        $this->client = new Client;
    }

    public function storeUserGithubId(StoreGithubUsernameRequest $request, User $user)
    {
        try {

            $data = $request->validated();

            $attributes = [
                'user_id' => $user->id,
            ];
            $values = [
                'github_username' => $data['github_username'],
            ];

            if ($this->isUserNameExist($values['github_username'])) {
                GithubUsername::updateOrCreateGithubUsername($attributes, $values);

                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::Login),
                    $user->id,
                    ['User Github Id Stored Successfully!! '],
                );

                return ApiResponse::setMessage('User Github Id Stored Successfully!! ')
                    ->response(Response::HTTP_OK);
            }

        } catch (Throwable $e) {

            return ApiResponse::setMessage('Failed to store User Github Id!! ')
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    public function isUserNameExist($username): bool
    {
        try {
            $url = config('github.user_lookup_url').$username;
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => 'token '.env('GITHUB_TOKEN'),
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            // return response()->json(['data' => $response], 200);
            return true;
        } catch (Throwable $e) {
            // return response()->json(['data' => $e->getMessage()], 400);
            return false;
        }

    }

    public function addCollaboratorToRepo(Request $request): JsonResponse
    {

        // check username existance
        if (! $this->isUserNameExist($request->username)) {
            return ApiResponse::setMessage('User name with the Github id not found!!')->response(Response::HTTP_NOT_FOUND);
        }

        // to update the
        $url = config('github.add_collaborator_url').'/'.env('GITHUB_REPO').'/collaborators/'.$request->username;

        try {
            $response = $this->client->put($url, [
                'headers' => [
                    'Authorization' => 'token '.env('GITHUB_TOKEN'),
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            GithubUsername::create(
                ['github_username' => $request->username,
                    'user_id' => Auth::user()->id,
                    'email' => $request->email,
                    'repo_access' => RepoAccessStatus::AccessGiven,
                ]
            );

            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::RepoAccessGiven),
                Auth::user()->id,
                ['Access Granted for Repository'],
            );

            // return response()->json(['message' => 'Permission granted Successfully'], 200);
            return ApiResponse::setMessage('Permission granted Successfully')->response(Response::HTTP_OK);
        } catch (\Exception $e) {

            GithubUsername::create(
                ['github_username' => $request->username,
                    'user_id' => Auth::user()->id,
                    'email' => $request->email,
                    'repo_access' => RepoAccessStatus::AccessFailed,
                ]
            );

            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::RepoAccessFailed),
                Auth::user()->id,
                ['Access Failed for Repository'],
            );

            // return response()->json(['message' => $e->getMessage()], 400);
            return ApiResponse::setMessage('Permission not granted')->response(Response::HTTP_BAD_REQUEST);
        }
    }
}
