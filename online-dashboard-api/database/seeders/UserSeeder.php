<?php

namespace Database\Seeders;

use App\Enums\UserEventLogType;
use App\Models\User;
use App\Models\UserEventLog;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected $model = User::class;

    public function run(): void
    {
        User::factory()
            ->count(10)
            ->create()
            ->each(function ($user) {
                // Account Created
                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::AccountCreated),
                    $user->id,
                    ['User Account Created !!']
                );

                // Job Applied
                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::JobApplied),
                    $user->id,
                    ['User applied to Job ID: 101']
                );

                // Project Requested
                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::ProjectRequested),
                    $user->id,
                    ['User requested Project ID: 202']
                );

                // Test Taken
                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::TestAssistanceRequestedByUser),
                    $user->id,
                    ['User completed Test ID: 303']
                );

                // QA Attempted
                UserEventLog::logUserEvent(
                    UserEventLogType::getDescription(UserEventLogType::QAAskedByUser),
                    $user->id,
                    ['User attempted QA ID: 404']
                );
            });
    }
}
