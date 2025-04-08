<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobOpportunityRequest;
use App\Http\Responses\ApiResponse;
use App\Models\JobOpportunity;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class JobOpportunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $jobsList = JobOpportunity::getAllJobs();

        return ApiResponse::setData($jobsList)->response(Response::HTTP_OK);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobOpportunityRequest $request): JsonResponse
    {
        $jobOpportunity = JobOpportunity::createJob($request);

        return ApiResponse::setMessage('New job created successfully')->mergeResults(['job_id' => $jobOpportunity->id])->response(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $job = JobOpportunity::showJob($id);

        return ApiResponse::setData($job)->response(Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobOpportunityRequest $request, string $id): JsonResponse
    {
        JobOpportunity::updateJob($request, $id);

        return ApiResponse::setMessage('Job updated successfuly')->response(Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        JobOpportunity::destroyJob($id);

        return ApiResponse::setMessage('Job deleted successfully')->response(Response::HTTP_OK);
    }

    public function getFilterJobs(Request $request)
    {
        info($request);
        $filters = collect($request->only(['qualification', 'batch', 'degree', 'job_type', 'experience']))
            ->filter()
            ->mapWithKeys(fn ($value, $key) => [$key => strtolower($value)]); // Convert to lowercase

        $jobs = JobOpportunity::query();

        foreach ($filters as $key => $value) {
            $jobs->when($value, fn ($q) => $q->where($key, 'LIKE', "%{$value}%"));
        }

        return ApiResponse::setData($jobs->get())->response(Response::HTTP_OK);
    }
}
