<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class GithubController extends Controller
{
    public $client;

    public function __construct()
    {
        $this->client = new Client;
    }

    public function checkUserNameExisted(): JsonResponse
    {
        try {
            $url = 'https://api.github.com/users/suryadheeraj0';
            $response = $this->client->get($url, [
                'headers' => [
                    'Authorization' => 'token '.env('GITHUB_TOKEN'),
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            return response()->json(['data' => $response], 200);
        } catch (Throwable $e) {
            return response()->json(['data' => $e->getMessage()], 400);
        }

    }

    public function addCollaboratorToRepo(Request $request): JsonResponse
    {

        $url = 'https://api.github.com/repos/'.env('GITHUB_OWNER').'/'.env('GITHUB_REPO').'/collaborators/'.$request->username;

        try {
            $response = $this->client->put($url, [
                'headers' => [
                    'Authorization' => 'token '.env('GITHUB_TOKEN'),
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            return response()->json(['message' => 'Permission granted Successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
