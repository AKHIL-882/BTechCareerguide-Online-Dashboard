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
                'CSE',
                'IT',
                'ECE',
                'ME',
                'CE',
            ]),
            'degree' => $this->faker->randomElement(['B.Tech', 'B.E.', 'M.Tech', 'MCA']),
            'job_type' => $this->faker->randomElement(['Full-Time', 'Part-Time', 'Internship', 'Remote']),
            'experience' => $this->faker->randomElement(['0', '1', '2', '3', '4', '5']),
        ];
    }
}
