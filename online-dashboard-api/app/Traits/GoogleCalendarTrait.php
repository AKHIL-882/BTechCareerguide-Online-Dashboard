<?php

namespace App\Traits;

use App\Models\Booking;
use Google_Client;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

trait GoogleCalendarTrait
{
    public function createGoogleCalendarEvent($booking)
    {
        $client = new Google_Client();
        $client->setAuthConfig(storage_path('app/google-service-account.json')); // Service Account
        $client->addScope(Google_Service_Calendar::CALENDAR_EVENTS);
        $client->setSubject(env('GOOGLE_CALENDAR_ADMIN_EMAIL')); // Admin Email to impersonate

        $service = new Google_Service_Calendar($client);

        // Fetch booking details
        $booking = Booking::with('user')->find($booking->id);
        if (!$booking || !$booking->user) {
            Log::error("Booking or User not found.");
            return response()->json(['error' => 'Booking or User not found'], 404);
        }

        // Define event details
        $event = new Google_Service_Calendar_Event([
            'summary'     => $booking->title,
            'description' => "Meeting for booking: {$booking->title}",
            'start'       => [
                'dateTime' => Carbon::parse($booking->date . ' ' . $booking->time)->toRfc3339String(),
                'timeZone' => 'UTC',
            ],
            'end'         => [
                'dateTime' => Carbon::parse($booking->date . ' ' . $booking->time)->addHour()->toRfc3339String(),
                'timeZone' => 'UTC',
            ],
            'conferenceData' => [
                'createRequest' => [
                    'requestId' => uniqid(),
                    'conferenceSolutionKey' => ['type' => 'hangoutsMeet']
                ]
            ],
            'attendees'   => [
                ['email' => $booking->user->email], // User Email
                ['email' => env('ADMIN_EMAIL')],   // Admin Email
            ],
        ]);

        $calendarId = 'primary';
        $event = $service->events->insert($calendarId, $event, ['conferenceDataVersion' => 1]);

        return response()->json([
            'message' => 'Event created successfully',
            'meet_link' => $event->getHangoutLink()
        ]);
    }
}
