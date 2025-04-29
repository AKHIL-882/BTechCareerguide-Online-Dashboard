<?php

namespace App\Enums;

/**
 * @model App\Models\UserEventLog
 *
 * @column status
 */
final class Status extends BaseEnum
{
    public const Pending = 0;

    public const Success = 1;

    public const Failure = 2;

    public const Due = 3;

    public static function getDescription($value): string
    {
        return match ($value) {
            self::Pending => 'Payment Pending',
            self::Success => 'Payment Successfull',
            self::Failure => 'Payment Failed',
            self::Due => 'Payment Due',
            default => parent::getDescription($value)
        };
    }
}
