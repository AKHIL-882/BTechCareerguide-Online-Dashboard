<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        // Create 10 sample projects
        $projects = [
            [
                'company_name' => 'Tech Innovators',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/tech1',
                'user_id' => 1,
                'is_admin_project' => true,
                'project_name' => 'AI Automation System',
                'technical_skills' => 'Python, AI, ML',
                'project_description' => 'An AI-powered automation system.',
                'days_to_complete' => 45,
                'document_name' => 'ai_automation.pdf',
                'project_status' => 2,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'NextGen Solutions',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/nextgen',
                'user_id' => 2,
                'is_admin_project' => false,
                'project_name' => 'E-commerce Platform',
                'technical_skills' => 'Laravel, Vue.js, MySQL',
                'project_description' => 'A complete e-commerce solution.',
                'days_to_complete' => 60,
                'document_name' => 'ecommerce_platform.pdf',
                'project_status' => 1,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Global Enterprises',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/global',
                'user_id' => 3,
                'is_admin_project' => true,
                'project_name' => 'Blockchain Security System',
                'technical_skills' => 'Blockchain, Node.js, Solidity',
                'project_description' => 'A blockchain-based security solution.',
                'days_to_complete' => 90,
                'document_name' => 'blockchain_security.pdf',
                'project_status' => 2,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Innovative Works',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/innovative',
                'user_id' => 4,
                'is_admin_project' => false,
                'project_name' => 'Mobile App Development',
                'technical_skills' => 'Flutter, Dart, Firebase',
                'project_description' => 'A cross-platform mobile application.',
                'days_to_complete' => 30,
                'document_name' => 'mobile_app.pdf',
                'project_status' => 1,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Future Vision',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/futurevision',
                'user_id' => 5,
                'is_admin_project' => true,
                'project_name' => 'Virtual Reality Platform',
                'technical_skills' => 'Unity, C#, VR Development',
                'project_description' => 'A platform for VR applications.',
                'days_to_complete' => 120,
                'document_name' => 'vr_platform.pdf',
                'project_status' => 2,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'GreenTech',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/greentech',
                'user_id' => 6,
                'is_admin_project' => false,
                'project_name' => 'Sustainable Energy System',
                'technical_skills' => 'Solar Tech, IoT, Hardware',
                'project_description' => 'A system for renewable energy.',
                'days_to_complete' => 75,
                'document_name' => 'sustainable_energy.pdf',
                'project_status' => 1,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'EduWorld',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/eduworld',
                'user_id' => 7,
                'is_admin_project' => true,
                'project_name' => 'Online Learning Platform',
                'technical_skills' => 'React, Node.js, MongoDB',
                'project_description' => 'A scalable online learning system.',
                'days_to_complete' => 90,
                'document_name' => 'online_learning.pdf',
                'project_status' => 1,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Smart Homes',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/smarthomes',
                'user_id' => 8,
                'is_admin_project' => false,
                'project_name' => 'IoT Smart Home System',
                'technical_skills' => 'IoT, Python, MQTT',
                'project_description' => 'A smart home automation system.',
                'days_to_complete' => 50,
                'document_name' => 'smarthome.pdf',
                'project_status' => 1,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Healthcare Next',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/healthcare',
                'user_id' => 9,
                'is_admin_project' => true,
                'project_name' => 'Telemedicine Platform',
                'technical_skills' => 'Laravel, Twilio, APIs',
                'project_description' => 'A platform for telemedicine services.',
                'days_to_complete' => 70,
                'document_name' => 'telemedicine.pdf',
                'project_status' => 2,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'company_name' => 'Space Ventures',
                'youtube_video_link' => 'https://youtu.be/8FoeHltb0JA',
                'payment_link' => 'https://payment.com/spaceventures',
                'is_admin_project' => false,
                'project_name' => 'Satellite Tracking System',
                'technical_skills' => 'C++, Aerospace Tech',
                'project_description' => 'A system for satellite tracking.',
                'days_to_complete' => 100,
                'document_name' => 'satellite_tracking.pdf',
                'project_status' => 2,
                'payment_status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        $userIds = User::pluck('id')->toArray();

        foreach ($projects as $index => $project) {
            $project['user_id'] = $userIds[$index % count($userIds)];

            Project::create($project);
        }
    }
}
