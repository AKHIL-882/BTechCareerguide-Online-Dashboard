<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class BookingController extends Controller
{
    // Get all booked slots
    public function index()
    {
        $userId = Auth::id();
        $bookings = Booking::where('user_id', $userId)->get();

        return response()->json($bookings);
    }

    // Book a new slot
    public function store(BookingRequest $request)
    {
        $time = Carbon::parse($request->time)->format('H:i');

        if ($time >= '09:00' && $time <= '20:00') {
            return ApiResponse::setMessage('Booking not allowed during office hours (9 AM - 8 PM)')->response(Response::HTTP_FORBIDDEN);
        }

        if (Booking::where('date', $request->date)->where('time', $time)->exists()) {
            return ApiResponse::setMessage('The slot is reserved - Please do select another slot or ping us on Instagram')->response(Response::HTTP_CONFLICT);
        }

        $booking = Booking::create([
            'date' => $request->date,
            'time' => $time,
            'title' => $request->title,
            'user_id' => Auth::id(),
        ]);

        return ApiResponse::setMessage('Slot booked successfully')->mergeResults(['bookings' => $booking])->response(Response::HTTP_CREATED);
    }

    // Delete a booking
    public function destroy($id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return ApiResponse::setMessage('Booking not found')->response(Response::HTTP_NOT_FOUND);
        }

        $booking->delete();

        return ApiResponse::setMessage('Booking Deleted Successfully')->response(Response::HTTP_OK);
    }

    // Update a booking
    public function update(BookingRequest $request, $id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return ApiResponse::setMessage('Booking not found')->response(Response::HTTP_NOT_FOUND);
        }

        // Ensure the user owns the booking
        if ($booking->user_id !== Auth::id()) {
            return ApiResponse::setMessage('Unauthorized')->response(Response::HTTP_FORBIDDEN);
        }

        $time = Carbon::parse($request->time)->format('H:i');

        if ($time >= '09:00' && $time <= '20:00') {
            return ApiResponse::setMessage('Booking not allowed during office hours (9 AM - 8 PM)')->response(Response::HTTP_FORBIDDEN);
        }

        if (
            Booking::where('date', $request->date)
                ->where('time', $time)
                ->where('id', '!=', $id)
                ->exists()
        ) {
            return ApiResponse::setMessage('The slot is reserved - Please select another slot or ping us on Instagram')->response(Response::HTTP_CONFLICT);
        }

        $booking->update([
            'date' => $request->date,
            'time' => $time,
            'title' => $request->title,
        ]);

        return ApiResponse::setMessage('Booking updated successfully')
            ->mergeResults(['booking' => $booking])
            ->response(Response::HTTP_OK);
    }

}
