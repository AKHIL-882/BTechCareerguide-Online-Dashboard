<?php

namespace Database\Seeders;

use App\Models\Project;
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
        
        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
