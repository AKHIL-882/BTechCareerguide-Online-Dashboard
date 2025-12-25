<?php

namespace App\Services;

use App\Models\User;
use App\Services\Contracts\TokenServiceInterface;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Http\Message\ServerRequestInterface;

class TokenService implements TokenServiceInterface
{
    public function __construct(
        private readonly AccessTokenController $accessTokenController,
        private readonly Psr17Factory $psr17Factory
    ) {}

    public function issueForCredentials(User $user, string $password): array
    {
        $body = [
            'grant_type' => 'password',
            'client_id' => config('passport.password_client.id'),
            'client_secret' => config('passport.password_client.secret'),
            'username' => $user->email,
            'password' => $password,
            'scope' => '',
        ];

        return $this->issueToken($this->buildRequest($body));
    }

    public function refresh(string $refreshToken): array
    {
        $body = [
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken,
            'client_id' => config('passport.password_client.id'),
            'client_secret' => config('passport.password_client.secret'),
            'scope' => '',
        ];

        return $this->issueToken($this->buildRequest($body));
    }

    /**
     * @param  array<string, mixed>  $body
     */
    private function buildRequest(array $body): ServerRequestInterface
    {
        return $this->psr17Factory
            ->createServerRequest('POST', config('auth.oauth_token_uri'))
            ->withParsedBody($body);
    }

    private function issueToken(ServerRequestInterface $request): array
    {
        $response = $this->accessTokenController->issueToken($request);

        $tokenData = json_decode($response->getContent(), true) ?? [];

        if (! empty($tokenData['error'])) {
            throw new \RuntimeException($tokenData['error_description'] ?? 'Token generation failed');
        }

        return $tokenData;
    }
}
