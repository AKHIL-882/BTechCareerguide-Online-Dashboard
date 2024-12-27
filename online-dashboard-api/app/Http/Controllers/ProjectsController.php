<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectsRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Project;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $projects = Project::getAllProjects() ;
        return ApiResponse::setData($projects)->response(Response::HTTP_OK) ;
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
    public function store(ProjectsRequest $request): JsonResponse
    {
        Project::createProject($request) ;
        return ApiResponse::setMessage('New Project created successfully')->response(Response::HTTP_CREATED) ;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $project = Project::showProject($id) ;
        return ApiResponse::setData($project)->response(Response::HTTP_OK) ;
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
    public function update(ProjectsRequest $request, string $id): JsonResponse
    {
        Project::updateProject($request, $id) ;
        return ApiResponse::setMessage('Project updated successfully')->response(Response::HTTP_OK) ;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        Project::destroyProject($id) ;
        return ApiResponse::setMessage('Project deleted successfully')->response(Response::HTTP_OK) ;
    }

    public function showUserProjects($id)
    {
        // write code here
    }
}
