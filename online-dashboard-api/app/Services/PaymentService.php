<?php

namespace App\Services;

use App\Enums\Status;
use App\Enums\UserEventLogType;
use App\Models\User;
use App\Models\UserEventLog;
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

            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::PaymentInitiated),
                $user->id,
                ['Payment Initiated for user']
            );

            return [
                'order_id' => $order['id'],
                'key' => config('razorpay.key'),
                'amount' => $amount,
            ];
        } catch (\Throwable $e) {
            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::PaymentInitiationFailed),
                $user->id,
                ['Payment Initiation failed for user']
            );

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

                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::PaymentSuccess),
                    $user->id,
                    ['Payment Successfully Taken from user']
                );

                return ['razorpay_payment_id' => $paymentId];
            }

            if ($paymentRecord) {
                $this->payments->updateStatus($paymentRecord, [
                    'razorpay_payment_id' => $paymentId,
                    'status' => Status::Failure,
                ]);
            }

            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::PaymentFailed),
                $user->id,
                ['Payment Failed!!']
            );

            throw new \RuntimeException('Payment failed');
        } catch (\Throwable $e) {
            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::PaymentVerificationFailed),
                $user->id,
                ['Payment verification failed!!  Taken from user']
            );

            throw $e;
        }
    }
}
