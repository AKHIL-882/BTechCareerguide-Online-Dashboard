<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobOpportunityRequest;
use App\Http\Requests\ReportJobRequest;
use App\Http\Responses\ApiResponse;
use App\Models\JobOpportunity;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

use function Termwind\parse;

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
        $data = $request->only(['company_name', 'role', 'batch', 'apply_link', 'ctc', 'location']);

        // Handle logo upload
        if ($request->hasFile('company_logo')) {
            $data['company_logo'] = $request->file('company_logo')->store('company_logos', 'public');
        }

        $jobOpportunity = JobOpportunity::createJob((object) $data);

        return ApiResponse::setMessage('New job created successfully')
            ->mergeResults(['job_id' => $jobOpportunity->id])
            ->response(Response::HTTP_CREATED);
    }


    public function parseJobs($entries)
    {
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

    public function bulkInsert(Request $request)
    {
        $input = $request->input('jobs');
        $entries = preg_split('/\n{2,}/', trim($input));
        if (empty($entries)) {
            return ApiResponse::setMessage('No jobs found')->response(Response::HTTP_BAD_REQUEST);
        }
        try {
            
            $jobs = self::parseJobs($entries);

            foreach ($jobs as $data) {
                JobOpportunity::create($data);
            }
        } catch (\Throwable $e) {
            return ApiResponse::setMessage($e->getMessage())->response(Response::HTTP_BAD_REQUEST);
        }

        return ApiResponse::setMessage('Jobs created successfully')->response(Response::HTTP_OK);
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
        $data = $request->only(['company_name', 'role', 'batch', 'apply_link', 'ctc', 'location']);

        if ($request->hasFile('company_logo')) {
            $data['company_logo'] = $request->file('company_logo')->store('company_logos', 'public');
        }

        JobOpportunity::updateJob((object) $data, $id);

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
        $filters = collect($request->only([
            'branch', 'batch', 'degree', 'job_type', 'experience',
        ]))->filter();

        $jobs = JobOpportunity::query();

        foreach ($filters as $key => $value) {
            $jobs->when($value, fn ($q) => $q->where($key, 'LIKE', "%{$value}%"));
        }

        return ApiResponse::setData($jobs->get())->response(Response::HTTP_OK);
    }

    public function report(ReportJobRequest $request, $id)
    {
        $job = JobOpportunity::findOrFail($id);
        $job->reportJob($request->reason, $request->message);

        return ApiResponse::setMessage('Job reported successfully')->response(Response::HTTP_OK);
    }
}
