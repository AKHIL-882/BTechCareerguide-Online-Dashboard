<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string|null $company_name
 * @property string|null $youtube_video_link
 * @property string|null $payment_link
 * @property int $user_id
 * @property string|null $project_name
 * @property string|null $technical_skills
 * @property string|null $project_description
 * @property int|null $days_to_complete
 * @property string|null $document_name
 * @property int $project_status
 * @property int $payment_status
 * @property int|null $is_admin_project
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \BenSampo\Enum\Enum $status
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject filterBySearch($searchItem)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereDaysToComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereIsAdminProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject wherePaymentLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereProjectDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereProjectStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereTechnicalSkills($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AdminProject whereYoutubeVideoLink($value)
 */
	class AdminProject extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $date
 * @property string $time
 * @property string $title
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Booking whereUserId($value)
 */
	class Booking extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $email
 * @property string $token
 * @property \Illuminate\Support\Carbon|null $expiration
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereExpiration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereUserId($value)
 */
	class ForgetPasswordTokens extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string|null $github_username
 * @property string|null $email
 * @property string|null $repo_access
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereGithubUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereRepoAccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereUserId($value)
 */
	class GithubUsername extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string|null $company_name
 * @property string|null $role
 * @property string|null $batch
 * @property string|null $ctc
 * @property string|null $company_logo
 * @property string|null $location
 * @property string|null $branch
 * @property string|null $degree
 * @property string|null $job_type
 * @property string|null $experience
 * @property string|null $apply_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $is_fraud
 * @property \App\Enums\JobReportReason|null $report_reason
 * @property string|null $report_message
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity batch($batch)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity branch($branch)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity degree($degree)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity experience($experience)
 * @method static \Database\Factories\JobOpportunityFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity jobType($jobType)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereApplyLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereBatch($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereBranch($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereCompanyLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereCtc($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereDegree($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereExperience($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereIsFraud($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereJobType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereReportMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereReportReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobOpportunity whereUpdatedAt($value)
 */
	class JobOpportunity extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $company_name
 * @property string $update
 * @property string|null $notification_image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereNotificationImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereUpdate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereUpdatedAt($value)
 */
	class Notification extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property string $payment_document_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project $project
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment wherePaymentDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereUserId($value)
 */
	class Payment extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string|null $company_name
 * @property string|null $youtube_video_link
 * @property string|null $payment_link
 * @property int $user_id
 * @property string|null $project_name
 * @property string|null $technical_skills
 * @property string|null $project_description
 * @property int|null $days_to_complete
 * @property string|null $document_name
 * @property int $project_status
 * @property int $payment_status
 * @property int|null $is_admin_project
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \BenSampo\Enum\Enum $status
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project filterBySearch($searchItem)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDaysToComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereIsAdminProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project wherePaymentLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereProjectDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereProjectStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereTechnicalSkills($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Project whereYoutubeVideoLink($value)
 */
	class Project extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property int $user_id
 * @property string|null $phone
 * @property string $amount
 * @property string|null $razorpay_payment_id
 * @property string|null $razorpay_order_id
 * @property \BenSampo\Enum\Enum $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereRazorpayOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereRazorpayPaymentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RazorpayPayment whereUserId($value)
 */
	class RazorpayPayment extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string|null $button
 * @property string|null $link
 * @property string|null $image
 * @property string|null $youtube_video_link
 * @property string|null $company_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereButton($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Slide whereYoutubeVideoLink($value)
 */
	class Slide extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $feedback
 * @property string $job_role
 * @property string|null $company
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\TestimonialFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereFeedback($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereJobRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Testimonial whereUserId($value)
 */
	class Testimonial extends \Eloquent {}
}

namespace App\Models{
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
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string|null $category
 * @property string|null $event_type
 * @property array<array-key, mixed>|null $data
 * @property string|null $updated_by_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog lastMonths(int $months = 3)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog ofEventType(string $eventType)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog ofUser(int $userId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereUpdatedByName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserEventLog whereUserId($value)
 */
	class UserEventLog extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string|null $company_name
 * @property string|null $youtube_video_link
 * @property string|null $payment_link
 * @property int $user_id
 * @property string|null $project_name
 * @property string|null $technical_skills
 * @property string|null $project_description
 * @property int|null $days_to_complete
 * @property string|null $document_name
 * @property int $project_status
 * @property int $payment_status
 * @property int|null $is_admin_project
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \BenSampo\Enum\Enum $status
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Payment> $payments
 * @property-read int|null $payments_count
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\UserProjectFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject filterBySearch($searchItem)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereDaysToComplete($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereIsAdminProject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject wherePaymentLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereProjectDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereProjectStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereTechnicalSkills($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProject whereYoutubeVideoLink($value)
 */
	class UserProject extends \Eloquent {}
}

