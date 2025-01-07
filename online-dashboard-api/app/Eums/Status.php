<?php

namespace App\Enums;

/**
 * @model App\Models\CustomerEventLog
 *
 * @column status
 */
final class Status extends BaseEnum
{
    public const Success = 0;

    public const Failure = 1;

    public static function getDescription($value): string
    {
        return match ($value) {
            self::Success => 'User Action Successfull',
            self::Failure => 'User Action Failed',
            default => parent::getDescription($value)
        };

    }
}
