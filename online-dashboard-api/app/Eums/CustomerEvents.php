<?php

namespace App\Enums;

/**
 * @model App\Models\CustomerEventLog
 *
 * @column status
 */
final class CustomerEvents extends BaseEnum
{
    public const Login = 0;

    public const Logout = 1;

    public const PasswordChanged = 2;

    public const JobApplied = 3;

    public const ProjectRequested = 4;

    public const PaymentScreenshotUploaded = 5;

    public const CodingQuestionRequested = 6;

    public const AccountCreated = 7;

    public const AccountDeleted = 8 ;

    public static function getDescription($value): string
    {
        return match($value) {
            self::Login => "User login Successfull",
            self::Logout => "User Logout Successfull",
            self::PasswordChanged => "User Password Changed",
            self::JobApplied => "User Applied for a job",
            self::ProjectRequested => "User Requested for a Project",
            self::PaymentScreenshotUploaded => "User PaymentScreenshotUploaded",
            self::CodingQuestionRequested => "User Requested for Coding question solution",
            self::AccountCreated => "User Created a Account",
            self::AccountDeleted => "User Deleted a Account"
        } ;
    }
    
}
