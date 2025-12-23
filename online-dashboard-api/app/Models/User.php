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

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $phone
 * @property string|null $education
 * @property string|null $status
 * @property array<array-key, mixed>|null $skills
 * @property int|null $experience_years
 * @property string|null $year
 * @property string|null $photo_drive_id
 * @property string|null $photo_link
 * @property string|null $resume_drive_id
 * @property string|null $resume_link
 * @property string|null $drive_folder_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Passport\Client> $clients
 * @property-read int|null $clients_count
 * @property-read \App\Models\GithubUsername|null $githubUsername
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Notification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ForgetPasswordTokens> $passwordResetTokens
 * @property-read int|null $password_reset_tokens_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project> $projects
 * @property-read int|null $projects_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RazorpayPayment> $razorpayPayments
 * @property-read int|null $razorpay_payments_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Testimonial> $testimonials
 * @property-read int|null $testimonials_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Passport\Token> $tokens
 * @property-read int|null $tokens_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\UserEventLog> $userEventLogs
 * @property-read int|null $user_event_logs_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDriveFolderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEducation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereExperienceYears($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhotoDriveId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhotoLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereResumeDriveId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereResumeLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereSkills($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 * @mixin \Eloquent
 */
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
        'skills',
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
            'skills' => 'array',
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
        info("user created");
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
        $user = $this->getAuthenticatedUser();

        if (! $user) {
            return [];
        }

        $eventMap = $this->getEventMap();

        return $this->buildStats($user->id, $eventMap);
    }

    /**
     * Get the currently authenticated API user.
     */
    private function getAuthenticatedUser()
    {
        return Auth::guard('api')->user();
    }

    /**
     * Map user event labels to their respective event types.
     */
    private function getEventMap(): array
    {
        return [
            'job_applied' => UserEventLogType::getDescription(UserEventLogType::JobApplied),
            'projects' => [
                'project_requested' => UserEventLogType::getDescription(UserEventLogType::ProjectRequested),
                'project_completed' => UserEventLogType::getDescription(UserEventLogType::ProjectCompleted),
                'project_approved'  => UserEventLogType::getDescription(UserEventLogType::ProjectApproved),
                'project_rejected'  => UserEventLogType::getDescription(UserEventLogType::ProjectRejected),
            ],
            'interview_scheduled' => [
                'interview_requested' => UserEventLogType::getDescription(UserEventLogType::InterviewRequestedByUser),
                'interview_rejected'  => UserEventLogType::getDescription(UserEventLogType::InterviewRejectedByAdmin),
                'interview_pending'   => UserEventLogType::getDescription(UserEventLogType::InterviewPending),
            ],
            'articles_viewed' => UserEventLogType::getDescription(UserEventLogType::ArticlesViewed),
        ];
    }

    /**
     * Build statistics for the given user ID and event map.
     */
    private function buildStats(int $userId, array $eventMap): array
    {
        return array_map(function ($label, $eventType) use ($userId) {
            return is_array($eventType)
                ? $this->buildSubStats($userId, $label, $eventType)
                : $this->buildSingleStat($userId, $label, $eventType);
        }, array_keys($eventMap), $eventMap);
    }

    /**
     * Build statistics for a single event type.
     */
    private function buildSingleStat(int $userId, string $label, string $eventType): array
    {
        return [
            'label' => $label,
            'value' => UserEventLog::countEventsByMonth([
                'user_id' => $userId,
                'event_type' => $eventType,
                'last_months' => 3,
            ]),
        ];
    }

    /**
     * Build statistics for multiple sub-event types.
     */
    private function buildSubStats(int $userId, string $label, array $subEventMap): array
    {
        $subStats = array_map(function ($subLabel, $subEventType) use ($userId) {
            return $this->buildSingleStat($userId, $subLabel, $subEventType);
        }, array_keys($subEventMap), $subEventMap);

        return [
            'label' => $label,
            'value' => $subStats,
        ];
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
            'skills' => explode(',', $data['skills'] ?? $this->skills),
        ]);
    }
}
