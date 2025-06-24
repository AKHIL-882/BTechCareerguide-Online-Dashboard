<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class UserEventLog extends Model
{
    protected $table = 'user_event_logs';

    protected $fillable = [
        'category',
        'event_type',
        'user_id',
        'data',
        'updated_by_name',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public static function boot()
    {
        parent::boot();
        $authUser = Auth::guard('api')->user();
        static::creating(function ($table) use ($authUser) {
            if ($authUser) {
                $table->updated_by_name = $authUser->first_name;
            } elseif (Auth::user()) {
                $table->updated_by_name = Auth::user()->first_name;
            }
        });
    }

    public static function logUserEvent(
        string $eventType,
        int $userId,
        ?array $data = null,
        ?string $category = null,
        ?string $updatedByName = null
    ) {
        $eventLog = [
            'category' => $category ?? 'user',
            'event_type' => $eventType,
            'data' => $data,
            'user_id' => $userId,
            'updated_by_name' => $updatedByName,
        ];

        return self::create($eventLog);
    }
}
