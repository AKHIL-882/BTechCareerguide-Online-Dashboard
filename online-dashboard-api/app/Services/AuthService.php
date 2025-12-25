<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\Contracts\AuthServiceInterface;
use App\Services\Contracts\TokenServiceInterface;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Laravel\Passport\RefreshTokenRepository;

class AuthService implements AuthServiceInterface
{
    public function __construct(
        private readonly UserRepository $users,
        private readonly TokenServiceInterface $tokens
    ) {}

    public function register(array $data): array
    {
        $user = $this->users->create($data);

        try {
            $tokenData = $this->tokens->issueForCredentials($user, $data['password']);
        } catch (\Throwable $e) {
            $this->users->delete($user);
            throw $e;
        }

        $this->loginUser($user);

        return $tokenData;
    }

    public function login(string $email, string $password): array
    {
        $user = $this->users->findByEmail($email);

        if (! $user || ! Hash::check($password, $user->password)) {
            throw new AuthenticationException('Unauthenticated');
        }

        $tokenData = $this->tokens->issueForCredentials($user, $password);

        $this->loginUser($user);

        // Event logging removed; reintroduce here if login auditing is required.

        return array_merge($tokenData, [
            'roles' => $user->roles->pluck('name')->first(),
        ]);
    }

    public function logout(User $user): void
    {
        Session::invalidate();
        Session::regenerateToken();

        $refreshTokenRepository = app(RefreshTokenRepository::class);

        foreach ($user->tokens as $token) {
            $token->revoke();
            $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($token->id);
        }
    }

    public function refresh(string $refreshToken): array
    {
        return $this->tokens->refresh($refreshToken);
    }

    private function loginUser(User $user): void
    {
        Auth::login($user);

        if (! Session::isStarted()) {
            Session::start();
        }
    }
}
