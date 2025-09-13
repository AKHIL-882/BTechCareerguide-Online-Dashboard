<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\UserEventLogType;
use App\Http\Responses\ApiResponse;
use App\Models\Payment;
use App\Models\RazorpayPayment;
use App\Models\User;
use App\Models\UserEventLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Razorpay\Api\Api;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function createRazorPayOrder(Request $request): JsonResponse
    {
        try {
            // $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));
            $api = new Api(config('razorpay.key'), config('razorpay.secret'));

            $orderData = [
                'receipt' => uniqid(),
                'amount' => $request->amount * 100, // Amount in paise
                'currency' => 'INR',
                'payment_capture' => 1, // Auto capture payment
            ];

            $razorpayOrder = $api->order->create($orderData);

            // $user = Auth::user();
            $user = Auth::user();

            $payment = RazorpayPayment::create([
                'name' => $user->name,
                'email' => $user->email,
                'user_id' => $user->id,
                'phone' => $user?->phone,
                'amount' => $request->amount,
                'razorpay_order_id' => $razorpayOrder['id'],
                // we don't have razorpay_payment_id yet
                'razorpay_payment_id' => null,
                'status' => Status::Pending,
            ]);

            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::PaymentInitiated),
                Auth::user()->id,
                ['Payment Initiated for user'],
            );

            return ApiResponse::setData([
                'order_id' => $razorpayOrder['id'],
                'key' => env('RAZORPAY_KEY'),
                'amount' => $request->amount,
            ])->mergeEnumsIntoResults([Status::class])->response(Response::HTTP_OK);

        } catch (\Exception $e) {

            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::PaymentInitiationFailed),
                Auth::user()->id,
                ['Payment Initiation failed for user'],
            );

            return ApiResponse::setmessage('Failed to create order: '.$e->getMessage())->response(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function verifyPayment(Request $request)
    {
        try {

            $api = new Api(config('razorpay.key'), config('razorpay.secret'));

            $paymentId = $request->razorpay_payment_id;
            $amount = $request->amount * 100;
            $email = $request->email;
            $orderId = $request->order_id;

            $payment = $api->payment->fetch($paymentId);
            $razorpayment = RazorpayPayment::where('razorpay_order_id', $orderId)->first();

            if ($payment->status == 'captured') {
                if ($razorpayment) {
                    $razorpayment->razorpay_payment_id = $paymentId;
                    $razorpayment->status = Status::Success;
                    $razorpayment->save();

                    UserEventLog::logUserEvent(
                        UserEventLogType::getDescription(UserEventLogType::PaymentSuccess),
                        Auth::user()->id,
                        ['Payment Successfully Taken from user'],
                    );
                }
            } else {
                if ($razorpayment) {
                    $razorpayment->razorpay_payment_id = $paymentId;
                    $razorpayment->status = Status::Failure;
                    $razorpayment->save();
                }

                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::PaymentFailed),
                    Auth::user()->id,
                    ['Payment Failed!!'],
                );

                return ApiResponse::setMessage('Payment failed')->response(Response::HTTP_BAD_REQUEST);

            }

            return ApiResponse::setMessage('Payment verified successfully!')->mergeResults(['razorpay_payment_id' => $paymentId])->response(Response::HTTP_OK);
        } catch (\Exception $e) {

            UserEventLog::logUserEvent(
                UserEventLogType::getDescription(UserEventLogType::PaymentVerificationFailed),
                Auth::user()->id,
                ['Payment verification failed!!  Taken from user'],
            );

            return ApiResponse::setMessage('Payment verification failed: '.$e->getMessage())->response(statusCode: Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
