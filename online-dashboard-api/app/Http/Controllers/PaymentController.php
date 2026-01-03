<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Requests\CreatePaymentOrderRequest;
use App\Http\Requests\VerifyPaymentRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Project;
use App\Services\Contracts\PaymentServiceInterface;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function __construct(private readonly PaymentServiceInterface $payments) {}

    public function createRazorPayOrder(CreatePaymentOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();

        try {
            $project = Project::where('id', $validated['project_id'])
                ->where('user_id', $request->user()->id)
                ->firstOrFail();

            $project->ensureAwaitingPaymentOrFail();
            $project->ensurePaymentAmountMatches((int) $validated['amount']);

            $trustedAmount = $project->payment_amount ?? (int) $validated['amount'];
            info('Creating RazorPay order for project ID '.$project->id.' with amount '.$trustedAmount);
            $payload = $this->payments->createOrder($request->user(), [
                'amount' => $trustedAmount,
                'project_id' => $project->id,
            ]);

            return ApiResponse::setData($payload)->mergeEnumsIntoResults([Status::class])->response(Response::HTTP_OK);
        } catch (\Exception $e) {

            return ApiResponse::setMessage('Failed to create order: '.$e->getMessage())->response(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function verifyPayment(VerifyPaymentRequest $request)
    {
        $validated = $request->validated();

        try {

            $payload = $this->payments->verify($request->user(), [
                'razorpay_payment_id' => $validated['razorpay_payment_id'],
                'order_id' => $validated['order_id'],
                'amount' => (int) $validated['amount'],
                'email' => $validated['email'] ?? null,
            ]);

            $project = Project::where('id', $validated['project_id'])
                ->where('user_id', $request->user()->id)
                ->firstOrFail();

            $project->ensureAwaitingPaymentOrPaidOrFail();
            $project->ensurePaymentAmountMatches((int) $validated['amount']);
            $project->markPaymentSuccess((int) $validated['amount']);

            return ApiResponse::setMessage('Payment verified successfully!')
                ->mergeResults(array_merge($payload, [
                    'project_id' => $project->id,
                    'project_status' => $project->project_status,
                    'payment_amount' => $project->payment_amount,
                ]))
                ->response(Response::HTTP_OK);
        } catch (\Exception $e) {

            return ApiResponse::setMessage('Payment verification failed: '.$e->getMessage())->response(statusCode: Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
