<?php

namespace App\Enums;

/**
 * @model App\Models\Projects
 *
 * @column status
 */
final class PaymentStatus extends BaseEnum
{
    public const Accepted = 0;

    public const Pending = 1;

    public const Building = 2;

    public const Success = 3;

    public const Rejected  = 4;

    public const PaymentSuccess = 5;

    public const Refund = 6;
}
