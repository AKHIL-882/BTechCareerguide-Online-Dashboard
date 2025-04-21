<?php

namespace App\Enums;

/**
 * @model App\Models\UserEventLog
 *
 * @column status
 */
final class BookingStatus extends BaseEnum
{
    public const Decline = 0;

    public const Accepted = 1;

    public const Pending = 2;

    public static function getDescription($value): string
    {
        return match ($value) {
            self::Accepted => 'Slot Accepted',
            self::Decline => 'Slot Rejected',
            self::Pending => 'Slot Pending for approval',
            default => parent::getDescription($value)
        };

    }

    public static function getAll()
    {
        return [
            [
                'value' => self::Accepted,
                'key' => 'Accepted',
                'description' => self::getDescription(self::Accepted),
            ],
            [
                'value' => self::Decline,
                'key' => 'Decline',
                'description' => self::getDescription(self::Decline),
            ],
            [
                'value' => self::Pending,
                'key' => 'Pending',
                'description' => self::getDescription(self::Pending),
            ],

        ];
    }
}
