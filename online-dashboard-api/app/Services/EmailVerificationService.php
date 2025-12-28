<?php

namespace App\Services;

use App\Mail\VerifyEmailOtpMail;
use App\Models\EmailVerificationCode;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class EmailVerificationService
{
    public function createChallenge(User $user): EmailVerificationCode
    {
        EmailVerificationCode::where('user_id', $user->id)->delete();

        return EmailVerificationCode::create([
            'user_id' => $user->id,
            'code' => (string) random_int(100000, 999999),
            'token' => (string) Str::uuid(),
            'expires_at' => now()->addMinutes(config('auth.email_verification_expiry', 15)),
        ]);
    }

    public function send(User $user): EmailVerificationCode
    {
        $challenge = $this->createChallenge($user);
        try {
            // Queue email to avoid blocking signup and swallow provider errors like MailerSend trial limits.
            Mail::to($user->email)->queue(new VerifyEmailOtpMail($user, $challenge));
        } catch (\Throwable $e) {
            info('Email queue failed', ['error' => $e->getMessage()]);
        }

        return $challenge;
    }

    public function verify(User $user, string $otp, string $token): void
    {
        $challenge = EmailVerificationCode::where('user_id', $user->id)
            ->where('token', $token)
            ->whereNull('used_at')
            ->first();

        if (! $challenge) {
            throw new \RuntimeException('Verification code not found. Please request a new code.');
        }

        if ($challenge->isExpired()) {
            throw new \RuntimeException('Verification code expired. Please request a new code.');
        }

        if ($challenge->code !== $otp) {
            throw new \RuntimeException('Invalid verification code.');
        }

        $challenge->forceFill([
            'used_at' => now(),
        ])->save();

        $user->forceFill([
            'email_verified_at' => now(),
        ])->save();
    }
}
