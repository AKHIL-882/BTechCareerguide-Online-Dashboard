<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Razorpay\Api\Api;

class PaymentController extends Controller
{
    public function createOrder(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $order = $api->order->create([
            'receipt' => uniqid(),
            'amount' => $request->amount * 100, // Razorpay requires amount in paise
            'currency' => 'INR',
            'payment_capture' => 1, // Auto capture payment
        ]);

        return response()->json(['order_id' => $order['id'], 'key' => env('RAZORPAY_KEY')]);
    }

    public function verifyPayment(Request $request)
    {
        try {
            $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

            $attributes = [
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ];

            $api->utility->verifyPaymentSignature($attributes);

            return response()->json(['message' => 'Payment verified successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Payment verification failed'], 400);
        }
    }
}
