<?php

namespace App\Services\Contracts;

use App\Models\User;

interface AuthServiceInterface
{
    /**
     * Register a new user and issue tokens.
     *
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function register(array $data): array;

    /**
     * Validate credentials, issue tokens and log events.
     *
     * @return array<string, mixed>
     */
    public function login(string $email, string $password): array;

    /**
     * Logout the authenticated user and revoke tokens.
     */
    public function logout(User $user): void;

    /**
     * Refresh tokens using the provided refresh token.
     *
     * @return array<string, mixed>
     */
    public function refresh(string $refreshToken): array;

    /**
     * Verify email with OTP and issue tokens.
     *
     * @return array<string, mixed>
     */
    public function verifyEmail(string $email, string $otp, string $token): array;

    /**
     * Resend verification OTP for the given email.
     *
     * @return array<string, mixed>
     */
    public function resendVerification(string $email): array;
}
