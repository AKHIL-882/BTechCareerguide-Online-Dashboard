<?php

namespace App\Repositories;

use App\Models\JobOpportunity;
use Illuminate\Database\Eloquent\Collection;

class JobOpportunityRepository
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function create(array $data): JobOpportunity
    {
        return JobOpportunity::create($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(int $id, array $data): void
    {
        $this->find($id)->update($data);
    }

    public function delete(int $id): void
    {
        $this->find($id)->delete();
    }

    public function find(int $id): JobOpportunity
    {
        return JobOpportunity::findOrFail($id);
    }

    public function all(): Collection
    {
        return JobOpportunity::all();
    }

    /**
     * @param  array<string, mixed>  $filters
     */
    public function filter(array $filters): Collection
    {
        $jobs = JobOpportunity::query();

        foreach ($filters as $key => $value) {
            $jobs->when($value, fn ($q) => $q->where($key, 'LIKE', "%{$value}%"));
        }

        return $jobs->get();
    }

    public function report(int $id, $reason, ?string $message = null): void
    {
        $this->find($id)->reportJob($reason, $message);
    }
}
