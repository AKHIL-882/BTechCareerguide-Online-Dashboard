<?php

namespace App\Clients;

use GuzzleHttp\Client;
use Throwable;

class GithubClient
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client;
    }

    public function userExists(string $username): bool
    {
        try {
            $url = config('github.user_lookup_url').$username;

            $this->client->get($url, [
                'headers' => [
                    'Authorization' => 'token '.env('GITHUB_TOKEN'),
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            return true;
        } catch (Throwable $e) {
            return false;
        }
    }

    public function addCollaborator(string $username, ?string $repoSlug = null): bool
    {
        try {
            $slug = $repoSlug ?: (env('GITHUB_OWNER').'/'.env('GITHUB_REPO'));
            $url = rtrim(config('github.add_collaborator_url'), '/').'/'.$slug.'/collaborators/'.$username;

            $this->client->put($url, [
                'headers' => [
                    'Authorization' => 'token '.env('GITHUB_TOKEN'),
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]);

            return true;
        } catch (Throwable $e) {
            return false;
        }
    }
}
