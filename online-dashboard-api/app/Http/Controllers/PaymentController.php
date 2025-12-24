<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Responses\ApiResponse;
use App\Services\Contracts\PaymentServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function __construct(private readonly PaymentServiceInterface $payments) {}

    public function createRazorPayOrder(Request $request): JsonResponse
    {
        try {
            $payload = $this->payments->createOrder($request->user(), $request->only(['amount']));

            return ApiResponse::setData($payload)->mergeEnumsIntoResults([Status::class])->response(Response::HTTP_OK);

        } catch (\Exception $e) {

            return ApiResponse::setMessage('Failed to create order: '.$e->getMessage())->response(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function verifyPayment(Request $request)
    {
        try {

            $payload = $this->payments->verify($request->user(), $request->only([
                'razorpay_payment_id',
                'order_id',
                'amount',
                'email',
            ]));

            return ApiResponse::setMessage('Payment verified successfully!')->mergeResults($payload)->response(Response::HTTP_OK);
        } catch (\Exception $e) {

            return ApiResponse::setMessage('Payment verification failed: '.$e->getMessage())->response(statusCode: Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
