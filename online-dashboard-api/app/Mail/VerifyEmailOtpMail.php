<?php

namespace App\Mail;

use App\Models\EmailVerificationCode;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmailOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        private readonly User $user,
        private readonly EmailVerificationCode $challenge
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Verify your email',
        );
    }

    public function content(): Content
    {
        $frontendUrl = rtrim(config('app.frontend_url', config('app.url')), '/');

        $verificationLink = $frontendUrl.'/verify-email?email='
            .urlencode($this->user->email)
            .'&token='.$this->challenge->token
            .'&code='.$this->challenge->code;

        return new Content(
            view: 'emails.verify-email',
            with: [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'code' => $this->challenge->code,
                'verificationLink' => $verificationLink,
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
