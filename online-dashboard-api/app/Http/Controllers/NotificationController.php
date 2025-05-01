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
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $allNotifications = $user->notifications()
            ->orderBy('notification_user.created_at', 'desc')
            ->get();

        $unreadCount = $allNotifications->where('pivot.is_read', false)->count();

        return ApiResponse::setData([
            'unread_count' => $unreadCount,
            'notifications' => NotificationResource::collection($allNotifications),
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

        foreach (User::all() as $user) {
            $user->notifications()->attach($notification->id);
        }

        return ApiResponse::setMessage('Notification created successfully.')
            ->response(Response::HTTP_CREATED);

    }

    public function markAsRead(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $notificationId = $request->input('notification_id');
        $user->notifications()->updateExistingPivot($notificationId, ['is_read' => true]);

        return ApiResponse::setMessage('Notification marked as read.')
            ->response(Response::HTTP_OK);
    }
}
