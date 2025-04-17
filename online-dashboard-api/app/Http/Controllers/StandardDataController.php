<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class StandardDataController extends Controller
{
    /**
     * Return standard data to frontend.
     */
    public function index(): JsonResponse
    {
        $data = [
            'degrees' => config('standard-data.degrees'),
            'branches' => config('standard-data.branches'),
            'job_types' => config('standard-data.job_types'),
            'batches' => config('standard-data.batches'),
        ];

        return ApiResponse::setMessage('Standard Data for all')
            ->setData($data)
            ->response(Response::HTTP_OK);
    }

    public function configHome(): JsonResponse
    {
        $data = ['home' => config('home')];

        return ApiResponse::setMessage('Standard Data for Home')
            ->setData($data)
            ->response(Response::HTTP_OK);
    }
}
