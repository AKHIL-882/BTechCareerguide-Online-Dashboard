<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $company_name
 * @property string $update
 * @property string|null $notification_image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereNotificationImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereUpdate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
