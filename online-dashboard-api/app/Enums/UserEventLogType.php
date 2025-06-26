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

    public static function getDescription($value): string
    {
        return match ($value) {
            self::Login => 'User login Successfull',
            self::Logout => 'User Logout Successfull',
            self::PasswordChanged => 'User Password Changed',
            self::JobApplied => 'User Applied for a job',
            self::ProjectRequested => 'User Requested for a Project',
            self::PaymentScreenshotUploaded => 'User Payment Screenshot Uploaded',
            self::CodingQuestionRequested => 'User Requested for Coding question solution',
            self::AccountCreated => 'User Created a Account',
            self::AccountDeleted => 'User Deleted a Account',
            self::PaymentSuccess => 'User Payment Successfull',
            self::PaymentFailed => 'User Payment Failed',
            self::PaymentInitiated => 'User Payment Initiated',
            self::PaymentInitiationFailed => 'User Payment Initiation Failed',
            self::PaymentVerificationFailed => 'User Payment Verification Failed',
            self::RepoAccessGiven => 'User Repo Access Given',
            self::RepoAccessFailed => 'User Repo Access Failed',
            self::QAAskedByUser => 'QA Asked By User',
            self::TestAssistanceRequestedByUser => 'Test Assistance Requested By User',
            default => parent::getDescription($value)
        };
    }
}
