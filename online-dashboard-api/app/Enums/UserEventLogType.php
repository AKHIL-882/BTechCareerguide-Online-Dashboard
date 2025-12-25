<?php

namespace App\Enums;

/**
 * @model App\Models\UserEventLog
 *
 * @column status
 */
final class UserEventLogType extends BaseEnum
{
    public const Login = 0;

    public const Logout = 1;

    public const PasswordChanged = 2;

    public const JobApplied = 3;

    public const ProjectRequested = 4;

    public const PaymentScreenshotUploaded = 5;

    public const CodingQuestionRequested = 6;

    public const AccountCreated = 7;

    public const AccountDeleted = 8;

    public const PaymentSuccess = 9;

    public const PaymentFailed = 10;

    public const PaymentInitiated = 11;

    public const PaymentInitiationFailed = 12;

    public const PaymentVerificationFailed = 13;

    public const RepoAccessGiven = 14;

    public const RepoAccessFailed = 15;

    public const QAAskedByUser = 16;

    public const TestAssistanceRequestedByUser = 17;

    public const ProjectCompleted = 18;

    public const ProjectApproved = 19;

    public const ProjectRejected = 20;

    public const InterviewRequestedByUser = 21;

    public const ArticlesViewed = 22;

    public const InterviewRejectedByAdmin = 23;

    public const InterviewPending = 24;

    public static function getDescription($value): string
    {
        return match ($value) {
            self::Login => 'user_login_successful',
            self::Logout => 'user_logout_successful',
            self::PasswordChanged => 'user_password_changed',
            self::JobApplied => 'user_applied_for_a_job',
            self::ProjectRequested => 'user_requested_for_a_project',
            self::ProjectCompleted => 'project_completed',
            self::ProjectApproved => 'project_approved',
            self::ProjectRejected => 'project_rejected',
            self::PaymentScreenshotUploaded => 'user_payment_screenshot_uploaded',
            self::CodingQuestionRequested => 'user_requested_for_coding_question_solution',
            self::AccountCreated => 'user_created_account',
            self::AccountDeleted => 'user_deleted_account',
            self::PaymentSuccess => 'user_payment_successful',
            self::PaymentFailed => 'user_payment_failed',
            self::PaymentInitiated => 'user_payment_initiated',
            self::PaymentInitiationFailed => 'user_payment_initiation_failed',
            self::PaymentVerificationFailed => 'user_payment_verification_failed',
            self::RepoAccessGiven => 'user_repo_access_given',
            self::RepoAccessFailed => 'user_repo_access_failed',
            self::QAAskedByUser => 'qa_asked_by_user',
            self::TestAssistanceRequestedByUser => 'test_assistance_requested_by_user',
            self::InterviewRequestedByUser => 'interview_requested_by_user',
            self::ArticlesViewed => 'articles_viewed_by_user',
            self::InterviewRejectedByAdmin => 'interview_rejected_by_admin',
            self::InterviewPending => 'interview_pending',
            default => parent::getDescription($value),
        };
    }
}
