<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Http\Responses\ApiResponse;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class NotificationController extends Controller
{
    public function unread()
    {
        $user = Auth::user();
        $unreadNotifications = $user->notifications()
            ->wherePivot('is_read', false)
            ->orderBy('notification_user.created_at', 'desc')
            ->get();

        // Get count of unread notifications
        $unreadCount = $unreadNotifications->count();

        // return response()->json($unreadNotifications) ;
        // dd($unreadNotifications) ;
        return ApiResponse::setData([
                'unread_count' => $unreadCount,
                'notifications' => NotificationResource::collection($unreadNotifications),
            ])
            ->response(Response::HTTP_OK);
    }

    public function createNotification(Request $request)
    {
        $user = Auth::user();
        $data = [
            'company_name' => $request->input('company_name'),
            'update' => $request->input('update'),
            'notification_image' => $request->input('notification_image'),
        ];

        $notification = Notification::createNotification($data);
        // // Attach the notification to the user
        // $user->notifications()->attach($notification, ['is_read' => false]);

        foreach (User::all() as $user) {
            $user->notifications()->attach($notification->id);
        }

        // return response()->json(['message' => 'Notification created successfully.']);
        return ApiResponse::setMessage('Notification created successfully.')
            ->response(Response::HTTP_CREATED);

    }

    public function markAsRead(Request $request)
    {
        $user = Auth::user();
        $notificationId = $request->input('notification_id');
        $user->notifications()->updateExistingPivot($notificationId, ['is_read' => true]);

        // return response()->json(['message' => 'Notification marked as read.']);
        return ApiResponse::setMessage('Notification marked as read.')
            ->response(Response::HTTP_OK);
    }
}
