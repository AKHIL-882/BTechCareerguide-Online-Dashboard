<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(JobOpportunitySeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(UserProjectSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(TestimonialSeeder::class);
        $this->call(SlideSeeder::class);
    }
}
