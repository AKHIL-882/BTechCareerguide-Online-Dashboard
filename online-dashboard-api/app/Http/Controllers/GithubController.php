<?php

namespace App\Http\Controllers;

use App\Eums\RepoAccessStatus;
use App\Http\Responses\ApiResponse;
use App\Models\UserGithubUsername;
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

    public function checkUserNameExisted($username): bool
    {
        try {
            $url = 'https://api.github.com/users/'.$username;
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
        if(!$this->checkUserNameExisted($request->username))
        {
            info($request->username) ;
            return ApiResponse::setMessage('User not found')->response(Response::HTTP_NOT_FOUND);
        }


        $url = 'https://api.github.com/repos/'.env('GITHUB_OWNER').'/'.env('GITHUB_REPO').'/collaborators/'.$request->username;

        try {
            $response = $this->client->put($url, [
                'headers' => [
                    'Authorization' => 'token '.env('GITHUB_TOKEN'),
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            info($request->username) ;

            UserGithubUsername::Create(
                ['github_username' => $request->username,
                    'user_id' => Auth::user()->id,
                    'email' => $request->email,
                    'repo_access' => RepoAccessStatus::AccessGiven,
                ]
            );

            return response()->json(['message' => 'Permission granted Successfully'], 200);
        } catch (\Exception $e) {

            UserGithubUsername::Create(
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
