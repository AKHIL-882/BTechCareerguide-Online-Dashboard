<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $category
 * @property string|null $event_type
 * @property array<array-key, mixed>|null $data
 * @property string|null $updated_by_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog lastMonths(int $months = 3)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog ofEventType(string $eventType)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog ofUser(int $userId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereUpdatedByName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereUserId($value)
 *
 * @mixin \Eloquent
 */
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

    public function scopeOfEventType($query, string $eventType)
    {
        if (is_array($eventType)) {
            return $query->whereIn('event_type', $eventType);
        }

        return $query->where('event_type', $eventType);
    }

    public function scopeOfUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeLastMonths($query, int $months = 3)
    {
        return $query->where('created_at', '>=', now()->subMonths($months));
    }

    /**
     * Get events based on filters (event_type and user_id)
     */
    public static function getEvents(array $filters = [])
    {
        $query = self::query();

        if (! empty($filters['event_type'])) {
            $query->ofEventType($filters['event_type']);
        }

        if (! empty($filters['user_id'])) {
            $query->ofUser($filters['user_id']);
        }

        return $query->latest()->get(); // You can also paginate here if needed
    }

    /**
     * Count events based on filters (event_type and user_id)
     */
    public static function countEvents(array $filters = [])
    {
        $query = self::query();
        if (! empty($filters['event_type'])) {
            $query->ofEventType($filters['event_type']);
        }

        if (! empty($filters['user_id'])) {
            $query->ofUser($filters['user_id']);
        }

        if (! empty($filters['last_months'])) {
            $query->lastMonths($filters['last_months']);
        }

        return $query->count();
    }

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

    public static function countEventsByMonth(array $filters, int $months = 3): array
    {
        $startDate = Carbon::now()->subMonths($months);

        $events = self::query()
            ->where('user_id', $filters['user_id'])
            ->whereIn('event_type', [$filters['event_type']])
            ->where('created_at', '>=', $startDate)
            ->get(['created_at']);

        $grouped = $events->groupBy(function ($event) {
            return Carbon::parse($event->created_at)->format('M');
        });

        $a = $grouped->map(function ($items, $month) {
            return [
                'month' => $month,
                'value' => $items->count(),
            ];
        })->values()->toArray();

        return $a;
    }
}
