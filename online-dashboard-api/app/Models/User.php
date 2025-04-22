<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserEventLogType;
use App\Jobs\ProcessResetPasswordMailJob;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function passwordResetTokens(): HasMany
    {
        return $this->hasMany(ForgetPasswordTokens::class);
    }

    public function razorpayPayments(): HasMany
    {
        return $this->hasMany(RazorpayPayment::class);
    }

    public function userEventLogs(): HasMany{
        return $this->hasMany(UserEventLog::class) ;
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function initiatePasswordReset(): void
    {
        $expiryTimelimit = config('auth.reset_password_expiry_time_limit');
        $expiry = Carbon::now()->addMinutes($expiryTimelimit);
        $token = str()->random(60);

        $this->passwordResetTokens()->create([
            'email' => $this->email,
            'token' => $token,
            'expiration' => $expiry,
        ]);

        // Dispatch the email job
        ProcessResetPasswordMailJob::dispatch($this->email, $token, $expiry, $this->name);

    }

    public static function createUser($data): object
    {
        $user = self::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->assignRole('user');

        UserEventLog::createLog(UserEventLogType::getDescription(UserEventLogType::AccountCreated), $user);

        return $user;
    }
}
