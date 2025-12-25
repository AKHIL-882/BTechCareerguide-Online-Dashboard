<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Carbon;

class EmailVerificationRequiredException extends Exception
{
    public function __construct(
        string $message,
        public readonly string $email,
        public readonly string $token,
        public readonly ?Carbon $expiresAt = null
    ) {
        parent::__construct($message);
    }
}
