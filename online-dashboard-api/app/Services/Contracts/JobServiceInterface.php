<?php

namespace App\Services\Contracts;

use App\Models\JobOpportunity;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface JobServiceInterface
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): JobOpportunity;

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(int $jobId, array $data): void;

    public function delete(int $jobId): void;

    public function list(): AnonymousResourceCollection;

    public function show(int $jobId): JobOpportunity;

    /**
     * @param  array<string, mixed>  $filters
     */
    public function filter(array $filters): Collection;

    /**
     * @return array<int, array<string, mixed>>
     */
    public function parseBulkJobs(string $rawInput): array;

    /**
     * @param  array<int, array<string, mixed>>  $jobs
     */
    public function bulkInsert(array $jobs): void;

    public function report(int $jobId, $reason, ?string $message = null): void;
}
