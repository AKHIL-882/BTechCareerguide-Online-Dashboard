<?php

namespace App\Enums;

/**
 * @model App\Models\Projects
 *
 * @column status
 */
final class ProjectStatus extends BaseEnum
{
    public const Accepted = 0;

    public const Pending = 1;

    public const Building = 2;

    public const Success = 3;

    public const Rejected = 4;

    public const PaymentSuccess = 5;

    public const Refund = 6;

    public const Completed = 7;


    public static function getDescription(mixed $value): string
    {
        return match ($value) {
            self::Accepted => 'Project Accepted',
            self::Pending => 'Project Pending',
            self::Building => 'Project Building',
            self::Success => 'Project Successfull',
            self::Rejected => 'Project Rejected',
            self::PaymentSuccess => 'Payment Successfull',
            self::Refund => 'Payment Refunded',
            self::Completed => 'Project Completed',
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
                'value' => self::Pending,
                'key' => 'Pending',
                'description' => self::getDescription(self::Pending),
            ],
            [
                'value' => self::Building,
                'key' => 'Building',
                'description' => self::getDescription(self::Building),
            ],
            [
                'value' => self::Success,
                'key' => 'Success',
                'description' => self::getDescription(self::Success),
            ],
            [
                'value' => self::Rejected,
                'key' => 'Rejected',
                'description' => self::getDescription(self::Rejected),
            ],
            [
                'value' => self::PaymentSuccess,
                'key' => 'Payment Success',
                'description' => self::getDescription(self::PaymentSuccess),
            ],
            [
                'value' => self::Refund,
                'key' => 'Refund',
                'description' => self::getDescription(self::Refund),
            ],
            [
                'value' => self::Completed,
                'key' => 'Completed',
                'description' => self::getDescription(self::Completed),
            ],

        ];

    }
}
