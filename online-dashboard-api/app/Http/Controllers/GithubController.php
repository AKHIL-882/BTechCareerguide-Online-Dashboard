<?php

namespace App\Http\Controllers;

use App\Enums\RepoAccessStatus;
use App\Http\Responses\ApiResponse;
use App\Models\GithubUsername;
use GuzzleHttp\Client;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
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
            return true ;
        } catch (Throwable $e) {
            // return response()->json(['data' => $e->getMessage()], 400);
            return false;
        }

    }

    public function addCollaboratorToRepo(Request $request): JsonResponse
    {

        //check username existance 
        if(!$this->isUserNameExist($request->username))
        {
            return ApiResponse::setMessage('User name with the Github id not found!!')->response(Response::HTTP_NOT_FOUND);
        }

        // to update the 
        $url =  config('github.add_collaborator_url').'/'.env('GITHUB_REPO').'/collaborators/'.$request->username;

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

            return response()->json(['message' => 'Permission granted Successfully'], 200);
        } catch (\Exception $e) {

            GithubUsername::create(
                ['github_username' => $request->username,
                    'user_id' => Auth::user()->id,
                    'email' => $request->email,
                    'repo_access' => RepoAccessStatus::AccessFailed,
                ]
            );

            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
