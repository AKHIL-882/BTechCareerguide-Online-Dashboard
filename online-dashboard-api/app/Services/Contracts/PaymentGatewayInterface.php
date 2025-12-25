<?php

namespace App\Services\Contracts;

interface PaymentGatewayInterface
{
    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public function createOrder(array $data): array;

    /**
     * @return array<string, mixed>
     */
    public function fetchPayment(string $paymentId): array;
}
