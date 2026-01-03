<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Resources\TransactionResource;
use App\Http\Responses\ApiResponse;
use App\Repositories\RazorpayPaymentRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminTransactionController extends Controller
{
    public function __construct(private readonly RazorpayPaymentRepository $payments) {}

    public function index(Request $request): JsonResponse
    {
        $filters = [
            'status' => $request->input('status'),
            'project_id' => $request->input('project_id'),
            'days' => $request->input('days', 7),
        ];

        $transactions = $this->payments->listWithFilters($filters);

        $summary = [
            'collected_amount' => $transactions->where('status', Status::Success)->sum('amount'),
            'refunds_amount' => 0,
            'disputes_amount' => 0,
            'failed_count' => $transactions->where('status', Status::Failure)->count(),
            'success_count' => $transactions->where('status', Status::Success)->count(),
            'total_count' => $transactions->count(),
        ];

        return ApiResponse::setData([
            'summary' => $summary,
            'transactions' => TransactionResource::collection($transactions),
        ])->response(Response::HTTP_OK);
    }
}
