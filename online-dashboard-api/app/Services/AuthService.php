<?php

namespace App\Services;

use App\Exceptions\EmailVerificationRequiredException;
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
        private readonly TokenServiceInterface $tokens,
        private readonly EmailVerificationService $emailVerification
    ) {}

    public function register(array $data): array
    {
        $user = $this->users->create($data);

        try {
            $challenge = $this->emailVerification->send($user);
        } catch (\Throwable $e) {
            $this->users->delete($user);
            throw $e;
        }

        return [
            'verification_required' => true,
            'email' => $user->email,
            'verification_token' => $challenge->token,
            'expires_in' => $challenge->expires_at?->diffInSeconds(now()),
        ];
    }

    public function login(string $email, string $password): array
    {
        $user = $this->users->findByEmail($email);

        if (! $user || ! Hash::check($password, $user->password)) {
            throw new AuthenticationException('Unauthenticated');
        }

        if (! $user->email_verified_at) {
            $challenge = $this->emailVerification->send($user);

            throw new EmailVerificationRequiredException(
                'Email verification required',
                $user->email,
                $challenge->token,
                $challenge->expires_at
            );
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

    public function verifyEmail(string $email, string $otp, string $token): array
    {
        $user = $this->users->findByEmail($email);

        if (! $user) {
            throw new AuthenticationException('User not found');
        }

        $this->emailVerification->verify($user, $otp, $token);

        $this->loginUser($user);

        return array_merge($this->issuePersonalAccessToken($user), [
            'roles' => $user->roles->pluck('name')->first(),
            'user_email' => $user->email,
        ]);
    }

    public function resendVerification(string $email): array
    {
        $user = $this->users->findByEmail($email);

        if (! $user) {
            throw new AuthenticationException('User not found');
        }

        if ($user->email_verified_at) {
            throw new \RuntimeException('Email already verified');
        }

        $challenge = $this->emailVerification->send($user);

        return [
            'verification_required' => true,
            'email' => $user->email,
            'verification_token' => $challenge->token,
            'expires_in' => $challenge->expires_at?->diffInSeconds(now()),
        ];
    }

    private function loginUser(User $user): void
    {
        Auth::login($user);

        if (! Session::isStarted()) {
            Session::start();
        }
    }

    private function issuePersonalAccessToken(User $user): array
    {
        $tokenResult = $user->createToken('authToken');
        $token = $tokenResult->token;
        $token->expires_at = now()->addMinutes(config('auth.email_verification_token_ttl', 60));
        $token->save();

        return [
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'refresh_token' => null,
            'expires_in' => $token->expires_at?->diffInSeconds(now()),
        ];
    }
}
