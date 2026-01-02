<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminProjectsRequest;
use App\Http\Requests\UpdateProjectStatusRequest;
use App\Http\Responses\ApiResponse;
use App\Models\AdminProject;
use App\Models\Project;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AdminProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $projects = AdminProject::getAllProjects();

        return ApiResponse::setData($projects)->response(Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminProjectsRequest $request): JsonResponse
    {
        AdminProject::createProject($request);

        return ApiResponse::setMessage('New Project created successfully')->response(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $project = AdminProject::showProject($id);

        return ApiResponse::setData($project)->response(Response::HTTP_OK);
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
    public function update(AdminProjectsRequest $request, string $id): JsonResponse
    {
        AdminProject::updateProject($request, $id);

        return ApiResponse::setMessage('Project updated successfully')->response(Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        AdminProject::destroyProject($id);

        return ApiResponse::setMessage('Project deleted successfully')->response(Response::HTTP_OK);
    }

    public function showUserProjects($id)
    {
        // write code here
    }

    public function updateStatus(UpdateProjectStatusRequest $request)
    {
        $payload = $request->validated();

        $project = Project::findOrFail($payload['project_id']);
        $project->project_status = (int) $payload['project_status'];

        if (array_key_exists('payment_amount', $payload)) {
            $project->payment_amount = (int) $payload['payment_amount'];
        }

        $project->save();

        return response()->json(['message' => 'Project status updated successfully!', 'project' => $project]);
    }
}
