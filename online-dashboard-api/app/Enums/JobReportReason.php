<?php

declare(strict_types=1);

namespace App\Enums;

enum JobReportReason: string
{
    case Fraud = 'Fraud';
    case Expiry = 'Expiry';
    case LinkNotWorking = 'Link Not Working';
    case Other = 'Other';
}
