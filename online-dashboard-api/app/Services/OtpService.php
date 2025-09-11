<?php

namespace App\Services;

use App\Models\OtpCode;
use App\Models\User;
use App\Notifications\SendOtpNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OtpService
{
    public function issue(User $user, string $purpose): OtpCode
    {
        OtpCode::where('user_id', $user->id)->where('purpose', $purpose)->delete();

        $length = (int) config('otp.length', 6);
        $ttl = (int) config('otp.ttl_minutes', 10);
        $maxAttempts = (int) config('otp.max_attempts', 5);

        $otp = $this->generateNumericCode($length);
        $otpCode = OtpCode::create([
            'user_id'     => $user->id,
            'purpose'     => $purpose,
            'code_hash'   => Hash::make($otp),
            'expires_at'  => now()->addMinutes($ttl),
            'max_attempts' => $maxAttempts,
            'last_sent_at' => now(),
        ]);

        $user->notify(new SendOtpNotification($otp, $ttl));

        return $otpCode;
    }

    public function resend(User $user, string $purpose): OtpCode
    {
        $cooldown = (int) config('otp.resend_cooldown_seconds', 60);

        $existing = OtpCode::where('user_id', $user->id)
            ->where('purpose', $purpose)
            ->latest('id')
            ->first();

        if ($existing && $existing->last_sent_at && now()->diffInSeconds($existing->last_sent_at) < $cooldown) {
            throw new \RuntimeException('Please wait before requesting another code.');
        }

        // If no existing (or expired/used), just issue a new one
        if (! $existing || $existing->isExpired()) {
            return $this->issue($user, $purpose);
        }

        // Re-send same code? Safer to rotate.
        $existing->delete();
        return $this->issue($user, $purpose);
    }

    public function verify(User $user, string $purpose, string $plainCode): bool
    {
        $code = OtpCode::where('user_id', $user->id)
            ->where('purpose', $purpose)
            ->latest('id')
            ->first();

        if (! $code) {
            throw new \RuntimeException('No active code. Please request a new one.');
        }

        if ($code->isExpired()) {
            $code->delete();
            throw new \RuntimeException('Code expired. Please request a new one.');
        }

        if (! $code->canAttempt()) {
            $code->delete();
            throw new \RuntimeException('Too many attempts. Please request a new code.');
        }

        $code->incrementAttempts();

        if (! Hash::check($plainCode, $code->code_hash)) {
            throw new \RuntimeException('Invalid code.');
        }

        // Success -> consume the code
        $code->delete();
        return true;
    }

    protected function generateNumericCode(int $length): string
    {
        $digits = '';
        for ($i = 0; $i < $length; $i++) {
            $digits .= random_int(0, 9);
        }
        return $digits;
    }
}
