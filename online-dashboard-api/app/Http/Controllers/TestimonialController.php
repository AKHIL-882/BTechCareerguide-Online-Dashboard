<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Testimonial;
use Symfony\Component\HttpFoundation\Response;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::with('user')->get();

        return ApiResponse::setMessage('All Testimonials Retrieved')
            ->setData($testimonials)
            ->response(Response::HTTP_OK);
    }

    public function store(StoreTestimonialRequest $request)
    {
        $testimonial = Testimonial::create($request->validated());

        return ApiResponse::setMessage('Testimonial Created Successfully')
            ->setData($testimonial)
            ->response(Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $testimonial = Testimonial::with('user')->findOrFail($id);

        return ApiResponse::setMessage('Testimonial Retrieved')
            ->setData($testimonial)
            ->response(Response::HTTP_OK);
    }

    public function update(UpdateTestimonialRequest $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->validated());

        return ApiResponse::setMessage('Testimonial Updated Successfully')
            ->setData($testimonial)
            ->response(Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return ApiResponse::setMessage('Testimonial Deleted Successfully')
            ->setData(null)
            ->response(Response::HTTP_NO_CONTENT);
    }
}
