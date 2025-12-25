<?php

namespace App\Services\Gateways;

use App\Services\Contracts\PaymentGatewayInterface;
use Razorpay\Api\Api;

class RazorpayGateway implements PaymentGatewayInterface
{
    private Api $client;

    public function __construct()
    {
        $this->client = new Api(
            config('razorpay.key'),
            config('razorpay.secret')
        );
    }

    public function createOrder(array $data): array
    {
        $order = $this->client->order->create($data);

        return $order->toArray();
    }

    public function fetchPayment(string $paymentId): array
    {
        $payment = $this->client->payment->fetch($paymentId);

        return $payment->toArray();
    }
}
