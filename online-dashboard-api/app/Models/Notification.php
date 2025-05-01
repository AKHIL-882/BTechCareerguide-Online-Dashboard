<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'id',
        'company_name',
        'update',
        'notification_image',
        'created_at',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'notification_user')->withPivot('is_read')->withTimestamps();
    }

    public static function createNotification($data)
    {
        $notification = self::create([
            'company_name' => $data['company_name'],
            'update' => $data['update'],
            'notification_image' => $data['notification_image'],
        ]);

        return $notification;
    }
}
