<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Sample projects data
        $projects = [
            [
                'company_name' => 'Tech Solutions',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payments.techsolutions.com',
            ],
            [
                'company_name' => 'Design Innovations',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payments.designinnovations.com',
            ],
            [
                'company_name' => 'EcoFriendly Co.',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payments.ecofriendly.com',
            ],
        ];

        $userIds = User::pluck('id')->toArray();

        foreach ($projects as $index => $project) {
            $project['user_id'] = $userIds[$index % count($userIds)];

            Project::create($project);
        }
    }
}
