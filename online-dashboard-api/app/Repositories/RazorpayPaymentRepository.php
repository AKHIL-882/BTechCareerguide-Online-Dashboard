<?php

namespace App\Repositories;

use App\Models\RazorpayPayment;

class RazorpayPaymentRepository
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): RazorpayPayment
    {
        return RazorpayPayment::create($data);
    }

    public function findByOrderId(string $orderId): ?RazorpayPayment
    {
        return RazorpayPayment::where('razorpay_order_id', $orderId)->first();
    }

    public function latestSuccessForProject(int $projectId): ?RazorpayPayment
    {
        return RazorpayPayment::where('project_id', $projectId)
            ->where('status', \App\Enums\Status::Success)
            ->latest()
            ->first();
    }

    public function listWithFilters(array $filters = [])
    {
        $query = RazorpayPayment::with(['user', 'project'])->orderByDesc('created_at');

        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (! empty($filters['project_id'])) {
            $query->where('project_id', $filters['project_id']);
        }

        if (! empty($filters['days'])) {
            $query->where('created_at', '>=', now()->subDays((int) $filters['days']));
        }

        return $query->get();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateStatus(RazorpayPayment $payment, array $data): void
    {
        $payment->fill($data);
        $payment->save();
    }
}
