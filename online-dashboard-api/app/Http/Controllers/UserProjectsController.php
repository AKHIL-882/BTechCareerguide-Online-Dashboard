<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UserProjectsRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Project;
use App\Models\UserProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserProjectsController extends Controller
{
    public function index(): JsonResponse
    {
        $userProjects = UserProject::getAllProjects();

        return ApiResponse::setData($userProjects)->mergeEnumsIntoResults([ProjectStatus::class])->response(Response::HTTP_OK);
    }

    public function store(StoreProjectRequest $request): JsonResponse
    {
        UserProject::createProject($request);

        return ApiResponse::setMessage('New Project created successfully')->response(Response::HTTP_CREATED);
    }

    public function show($id): JsonResponse
    {
        $userProject = UserProject::showProject($id);

        return ApiResponse::setData($userProject)->response(Response::HTTP_OK);
    }

    public function update(UserProjectsRequest $request, $id): JsonResponse
    {
        UserProject::updateProject($request, $id);

        return ApiResponse::setMessage('Project Updated created successfully')->response(Response::HTTP_OK);
    }

    public function destroy($id): JsonResponse
    {
        UserProject::destroyProject();

        return ApiResponse::setMessage('Project deleted successfully')->response(Response::HTTP_OK);
    }

    public function showAllProjectsForPayment(): JsonResponse
    {
        $userId = Auth::user()->id;
        $projectsList = Project::showAllProjects($userId);

        return ApiResponse::setData($projectsList)->response(Response::HTTP_OK);
    }

    public function search(Request $request)
    {
        $projects = Project::searchProject($request);

        return ApiResponse::setData($projects)->response(Response::HTTP_OK);
    }
}
