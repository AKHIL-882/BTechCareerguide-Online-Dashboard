<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobOpportunityRequest;
use App\Http\Requests\ReportJobRequest;
use App\Http\Responses\ApiResponse;
use App\Services\Contracts\JobServiceInterface;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class JobOpportunityController extends Controller
{
    public function __construct(private readonly JobServiceInterface $jobs) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $jobsList = $this->jobs->list();

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
        $data = $request->only(['company_name', 'role', 'batch', 'apply_link', 'ctc', 'location']);

        // Handle logo upload
        if ($request->hasFile('company_logo')) {
            $data['company_logo'] = $request->file('company_logo')->store('company_logos', 'public');
        }

        $jobOpportunity = $this->jobs->create($data);

        return ApiResponse::setMessage('New job created successfully')
            ->mergeResults(['job_id' => $jobOpportunity->id])
            ->response(Response::HTTP_CREATED);
    }

    public function bulkInsert(Request $request)
    {
        $input = $request->input('jobs');
        if (empty($input)) {
            return ApiResponse::setMessage('No jobs found')->response(Response::HTTP_BAD_REQUEST);
        }
        try {

            $jobs = $this->jobs->parseBulkJobs($input);
            $this->jobs->bulkInsert($jobs);
        } catch (\Throwable $e) {
            return ApiResponse::setMessage($e->getMessage() ?: 'Unable to bulk insert jobs')->response(Response::HTTP_BAD_REQUEST);
        }

        return ApiResponse::setMessage('Jobs created successfully')->response(Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $job = $this->jobs->show((int) $id);

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
        $data = $request->only(['company_name', 'role', 'batch', 'apply_link', 'ctc', 'location']);

        if ($request->hasFile('company_logo')) {
            $data['company_logo'] = $request->file('company_logo')->store('company_logos', 'public');
        }

        $this->jobs->update((int) $id, $data);

        return ApiResponse::setMessage('Job updated successfuly')->response(Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->jobs->delete((int) $id);

        return ApiResponse::setMessage('Job deleted successfully')->response(Response::HTTP_OK);
    }

    public function getFilterJobs(Request $request)
    {
        $filters = $request->only(['branch', 'batch', 'degree', 'job_type', 'experience']);

        return ApiResponse::setData($this->jobs->filter($filters))->response(Response::HTTP_OK);
    }

    public function report(ReportJobRequest $request, $id)
    {
        $this->jobs->report((int) $id, $request->reason, $request->message);

        return ApiResponse::setMessage('Job reported successfully')->response(Response::HTTP_OK);
    }
}
