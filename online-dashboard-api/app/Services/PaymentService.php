<?php

namespace App\Services;

use App\Enums\Status;
use App\Models\User;
use App\Repositories\RazorpayPaymentRepository;
use App\Services\Contracts\PaymentGatewayInterface;
use App\Services\Contracts\PaymentServiceInterface;

class PaymentService implements PaymentServiceInterface
{
    public function __construct(
        private readonly PaymentGatewayInterface $gateway,
        private readonly RazorpayPaymentRepository $payments
    ) {}

    public function createOrder(User $user, array $payload): array
    {
        try {
            $amount = (int) $payload['amount'];

            $order = $this->gateway->createOrder([
                'receipt' => uniqid(),
                'amount' => $amount * 100,
                'currency' => 'INR',
                'payment_capture' => 1,
            ]);

            $this->payments->create([
                'name' => $user->name,
                'email' => $user->email,
                'user_id' => $user->id,
                'phone' => $user?->phone,
                'amount' => $amount,
                'razorpay_order_id' => $order['id'],
                'razorpay_payment_id' => null,
                'status' => Status::Pending,
            ]);

            // Event logging removed; add instrumentation here if payment initiation needs auditing.

            return [
                'order_id' => $order['id'],
                'key' => config('razorpay.key'),
                'amount' => $amount,
            ];
        } catch (\Throwable $e) {
            // Event logging removed; add instrumentation here if payment initiation failures need auditing.

            throw $e;
        }
    }

    public function verify(User $user, array $payload): array
    {
        try {
            $paymentId = (string) ($payload['razorpay_payment_id'] ?? '');
            $orderId = (string) ($payload['order_id'] ?? '');
            $paymentRecord = $this->payments->findByOrderId($orderId);

            $paymentData = $this->gateway->fetchPayment($paymentId);

            if (($paymentData['status'] ?? null) === 'captured') {
                if ($paymentRecord) {
                    $this->payments->updateStatus($paymentRecord, [
                        'razorpay_payment_id' => $paymentId,
                        'status' => Status::Success,
                    ]);
                }

                // Event logging removed; add instrumentation here if payment successes need auditing.

                return ['razorpay_payment_id' => $paymentId];
            }

            if ($paymentRecord) {
                $this->payments->updateStatus($paymentRecord, [
                    'razorpay_payment_id' => $paymentId,
                    'status' => Status::Failure,
                ]);
            }

            // Event logging removed; add instrumentation here if payment failures need auditing.

            throw new \RuntimeException('Payment failed');
        } catch (\Throwable $e) {
            // Event logging removed; add instrumentation here if payment verification failures need auditing.

            throw $e;
        }
    }
}
