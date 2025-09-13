<?php

namespace App\Models;

use App\Enums\UserEventLogType;
use App\Jobs\ProcessResetPasswordMailJob;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
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
        'phone',
        'education',
        'status',
        'experience_years',
        'photo_drive_id',
        'photo_link',
        'resume_drive_id',
        'resume_link',
        'drive_folder_id',
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

    public function userEventLogs(): HasMany
    {
        return $this->hasMany(UserEventLog::class);
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

        // UserEventLog::logUserEvent(
        //     UserEventLogType::getDescription(UserEventLogType::AccountCreated),
        //     Auth::user()?->id,
        //     ['User Account Created !!'],
        // );

        return $user;
    }

    public function getUserJobStats(): array
    {
        // write code here
        return [];
    }

    public function notifications()
    {
        return $this->belongsToMany(Notification::class, 'notification_user')->withPivot('is_read')->withTimestamps();
    }

    public function githubUsername()
    {
        return $this->hasOne(GithubUsername::class);
    }

    public function getHeaderStatsForUser()
    {
        $user = Auth::guard('api')->user();

        if (! $user) {
            return [];
        }

        $userId = $user->id;

        $eventMap = [
            'Viewed' => UserEventLogType::getDescription(UserEventLogType::JobApplied),
            'Projects' => UserEventLogType::getDescription(UserEventLogType::ProjectRequested),
            'Tests' => UserEventLogType::getDescription(UserEventLogType::TestAssistanceRequestedByUser),
            'QA' => UserEventLogType::getDescription(UserEventLogType::QAAskedByUser),
        ];

        $stats = [];

        foreach ($eventMap as $label => $eventType) {
            $stats[] = [
                'label' => $label,
                'value' => UserEventLog::countEvents([
                    'user_id' => $userId,
                    'event_type' => $eventType,
                ]),
            ];
        }

        return $stats;
    }

    public function updateProfile(array $data): void
    {
        $this->fill([
            'name' => $data['name'] ?? $this->name,
            'email' => $data['email'] ?? $this->email,
            'phone' => $data['phone'] ?? $this->phone,
            'education' => $data['education'] ?? $this->education,
            'status' => $data['status'] ?? $this->status,
            'experience_years' => $data['experience_years'] ?? $this->experience_years,
        ]);
    }
}
