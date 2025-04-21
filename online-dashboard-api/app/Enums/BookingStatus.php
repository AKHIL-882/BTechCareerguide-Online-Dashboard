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
}
