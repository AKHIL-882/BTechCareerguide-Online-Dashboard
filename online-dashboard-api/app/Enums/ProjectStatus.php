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

    public const Delivered = 3;

    public const Rejected = 4;

    public const PaymentSuccess = 5;

    public const Refunded = 6;

    public const AwaitingPayment = 8;

    /** @deprecated Use Delivered instead. */
    public const Success = self::Delivered;

    public static function getDescription($value): string
    {
        return match ($value) {
            self::Accepted => 'Project accepted',
            self::Pending => 'Project pending admin review',
            self::Building => 'Project under development',
            self::Delivered => 'Project access delivered',
            self::Rejected => 'Project rejected / stopped',
            self::PaymentSuccess => 'Payment received successfully',
            self::Refunded => 'Payment refunded',
            self::AwaitingPayment => 'Awaiting payment',
            default => parent::getDescription($value)
        };
    }
}
