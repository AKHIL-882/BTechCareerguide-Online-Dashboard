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
        $eventMap = [
            'Viewed' => UserEventLogType::getDescription(UserEventLogType::JobApplied),
            'Projects' => [
                'ProjectRequested' => UserEventLogType::getDescription(UserEventLogType::ProjectRequested),
                'ProjectCompleted' => UserEventLogType::getDescription(UserEventLogType::ProjectCompleted),
                'ProjectApproved' => UserEventLogType::getDescription(UserEventLogType::ProjectApproved),
                'ProjectRejected' => UserEventLogType::getDescription(UserEventLogType::ProjectRejected),
            ],
            'Interview Scheduled' => UserEventLogType::getDescription(UserEventLogType::InterviewRequestedByUser),
            'Articles Viewed' => UserEventLogType::getDescription(UserEventLogType::ArticlesViewed),
        ];

        User::factory()
            ->count(10)
            ->create()
            ->each(function ($user) use ($eventMap) {
                foreach ($eventMap as $label => $eventType) {
                    if (is_array($eventType)) {
                        foreach ($eventType as $subLabel => $subEventType) {
                            UserEventLog::logUserEvent(
                                $subEventType,
                                $user->id,
                                ["{$subLabel} event for User ID: {$user->id}"]
                            );
                        }
                    } else {
                        UserEventLog::logUserEvent(
                            $eventType,
                            $user->id,
                            ["{$label} event for User ID: {$user->id}"]
                        );
                    }
                }
            });
    }
}
