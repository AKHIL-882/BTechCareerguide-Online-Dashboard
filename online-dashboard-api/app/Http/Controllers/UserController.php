<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Responses\ApiResponse;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        return (new ApiResponse)
            ->mergeResults((new UserResource($user))->resolve())
            ->response(200);
    }

    public function showDashboardStats()
    {
        $user = Auth::user();

        $data = $user->getHeaderStatsForUser();

        return ApiResponse::setMessage('All Dashboard Stats Retrieved')
            ->setData($data)
            ->response(Response::HTTP_OK);
    }
}
