<?php

namespace Database\Factories;

use App\Models\JobOpportunity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobOpportunity>
 */
class JobOpportunityFactory extends Factory
{
    protected $model = JobOpportunity::class;

    public function definition(): array
    {
        return [
            'company_name' => $this->faker->company(),
            'role' => $this->faker->jobTitle(),
            'batch' => $this->faker->randomElement(['2020', '2021', '2022', '2023', '2024', '2025']),
            'apply_link' => $this->faker->url(),
            'branch' => $this->faker->randomElement([
                'Computer Science Engineering',
                'Information Technology',
                'Electronics and Communication',
                'Mechanical Engineering',
                'Civil Engineering',
            ]),
            'degree' => $this->faker->randomElement(['B.Tech', 'B.E.', 'M.Tech', 'MCA']),
            'job_type' => $this->faker->randomElement(['Full-Time', 'Part-Time', 'Internship', 'Remote']),
            'experience' => $this->faker->randomElement(['Fresher', '0-1 Years', '1-3 Years', '3+ Years']),
        ];
    }
}
