<?php

namespace App\Enums;

/**
 * @model App\Models\UserEventLog
 *
 * @column status
 */
final class Status extends BaseEnum
{
    public const Success = 0;

    public const Failure = 1;

    public const Due = 3;

    public static function getDescription($value): string
    {
        return match ($value) {
            self::Success => 'Payment Successfull',
            self::Failure => 'Payment Failed',
            self::Due => 'Payment Due',
            default => parent::getDescription($value)
        };

    }
}
