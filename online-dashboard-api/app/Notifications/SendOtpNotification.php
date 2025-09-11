<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class SendOtpNotification extends Notification
{
    use Queueable;

    public function __construct(
        public string $otp,
        public int $ttlMinutes
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Your verification code')
            ->greeting('Hi ' . $notifiable->name . ',')
            ->line('Your one-time verification code is:')
            ->line('**' . $this->otp . '**')
            ->line('This code expires in ' . $this->ttlMinutes . ' minutes.')
            ->line('If you did not request this, you can ignore this email.');
    }
}
