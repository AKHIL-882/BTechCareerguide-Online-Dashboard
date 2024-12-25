<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobOpportunityRequest;
use App\Http\Responses\ApiResponse;
use App\Models\JobOpportunity;
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
        JobOpportunity::createJob($request);

        return ApiResponse::setMessage('New job created successfully')->response(Response::HTTP_CREATED);
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
}
