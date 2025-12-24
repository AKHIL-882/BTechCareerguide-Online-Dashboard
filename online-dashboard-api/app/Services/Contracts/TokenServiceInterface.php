<?php

namespace App\Services\Contracts;

use App\Models\User;

interface TokenServiceInterface
{
    /**
     * Issue an access and refresh token for the given credentials.
     *
     * @return array<string, mixed>
     */
    public function issueForCredentials(User $user, string $password): array;

    /**
     * Issue an access and refresh token using a refresh token.
     *
     * @return array<string, mixed>
     */
    public function refresh(string $refreshToken): array;
}
