<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserProjectsRequest;
use App\Http\Responses\ApiResponse;
use App\Models\UserProject;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserProjectsController extends Controller
{
    public function index(): JsonResponse
    {
        $userProjects = UserProject::getAllProjects();

        return ApiResponse::setData($userProjects)->response(Response::HTTP_OK);
    }

    public function store(UserProjectsRequest $request): JsonResponse
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
}