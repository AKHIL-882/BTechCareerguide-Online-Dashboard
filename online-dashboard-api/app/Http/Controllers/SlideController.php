<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSlideRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Slide;
use Symfony\Component\HttpFoundation\Response;

class SlideController extends Controller
{
    public function index()
    {
        return ApiResponse::setData(['slides' => Slide::all()])->response(Response::HTTP_OK);
    }

    public function store(StoreSlideRequest $request)
    {
        $slide = Slide::create($request->validated());

        return ApiResponse::setMessage('New Slide Created')->response(Response::HTTP_CREATED);
    }
}
