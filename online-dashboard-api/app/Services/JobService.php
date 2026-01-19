<?php

namespace App\Services;

use App\Http\Resources\JobResource;
use App\Models\JobOpportunity;
use App\Repositories\JobOpportunityRepository;
use App\Services\CompanyLogoService;
use App\Services\Contracts\JobServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class JobService implements JobServiceInterface
{
    public function __construct(
        private readonly JobOpportunityRepository $jobs,
        private readonly CompanyLogoService $companyLogos
    ) {}

    public function create(array $data): JobOpportunity
    {
        return $this->jobs->create($this->hydrateCompanyLogo($data));
    }

    public function update(int $jobId, array $data): void
    {
        $this->jobs->update($jobId, $data);
    }

    public function delete(int $jobId): void
    {
        $this->jobs->delete($jobId);
    }

    public function list(): AnonymousResourceCollection
    {
        return JobResource::collection($this->jobs->all());
    }

    public function show(int $jobId): JobOpportunity
    {
        return $this->jobs->find($jobId);
    }

    public function filter(array $filters): Collection
    {
        return $this->jobs->filter(array_filter($filters));
    }

    public function parseBulkJobs(string $rawInput): array
    {
        $entries = preg_split('/\n{2,}/', trim($rawInput)) ?: [];
        $jobs = [];

        foreach ($entries as $entry) {
            $lines = explode("\n", trim($entry));
            $job = [];

            foreach ($lines as $line) {
                if (preg_match('/^(.+?):\s*(.+)$/', $line, $matches)) {
                    $key = strtolower(trim($matches[1]));
                    $value = trim($matches[2]);

                    foreach (config('standardjobkeys') as $standardKey => $synonyms) {
                        if (in_array($key, $synonyms)) {
                            $job[$standardKey] = $value;
                            break;
                        }
                    }
                }
            }

            if (! empty($job)) {
                $jobs[] = $job;
            }
        }

        return $jobs;
    }

    public function bulkInsert(array $jobs): void
    {
        foreach ($jobs as $job) {
            $this->jobs->create($this->hydrateCompanyLogo($job));
        }
    }

    public function report(int $jobId, $reason, ?string $message = null): void
    {
        $this->jobs->report($jobId, $reason, $message);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function hydrateCompanyLogo(array $data): array
    {
        if (! empty($data['company_logo']) || empty($data['company_name'])) {
            return $data;
        }

        $data['company_logo'] = $this->companyLogos->getLogoUrlForCompany(
            (string) $data['company_name']
        );

        return $data;
    }
}
