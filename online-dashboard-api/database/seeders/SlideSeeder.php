<?php

namespace Database\Seeders;

use App\Models\Slide;
use Illuminate\Database\Seeder;

class SlideSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'title' => 'Schedule your interview',
                'description' => 'Easily plan and manage your interview schedule with one click.',
                'button' => 'Schedule Now',
                'link' => '/calendar',
                'image' => 'https://img.freepik.com/free-vector/online-job-interview-concept_23-2148628159.jpg?semt=ais_hybrid&w=740&q=80',
                'youtube_video_link' => null,
                'company_name' => null,
            ],
            [
                'title' => 'Check our latest YouTube video',
                'description' => 'Stay updated with tutorials, tips, and product updates.',
                'button' => 'Watch Now',
                'link' => null,
                'image' => null,
                'youtube_video_link' => 'https://youtu.be/sZQwAtVdiPg',
                'company_name' => 'BTech Career Guide',
            ],
            [
                'title' => 'Special Promotion 🎉',
                'description' => 'Get 30% off your first project purchase this week only.',
                'button' => 'Buy a Project',
                'link' => '/buy',
                'image' => 'https://img.freepik.com/free-vector/people-starting-business-project_23-2148866842.jpg',
                'youtube_video_link' => null,
                'company_name' => null,
            ],
        ];

        foreach ($slides as $slide) {
            Slide::create($slide);
        }
    }
}
