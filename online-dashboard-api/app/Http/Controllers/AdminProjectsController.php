<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminProjectsRequest;
use App\Http\Responses\ApiResponse;
use App\Models\AdminProject;
use App\Models\Project;
use Illuminate\Http\Request;
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

    public function updateStatus(Request $request)
    {
        // Logging removed; add request logging here if project status changes need auditing.
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'project_status' => 'required|integer|min:0|max:6',
        ]);

        $project = Project::find($request->project_id);
        $project->project_status = $request->project_status;
        $project->save();

        return response()->json(['message' => 'Project status updated successfully!', 'project' => $project]);
    }
}
