<?php

namespace App\Services\Contracts;

use App\Models\User;

interface PaymentServiceInterface
{
    /**
     * Create a payment order and persist the intent.
     *
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public function createOrder(User $user, array $payload): array;

    /**
     * Verify the payment outcome and update persistence.
     *
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public function verify(User $user, array $payload): array;
}
