<?php

namespace Database\Factories;

use App\Enums\JobReportReason;
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
            'degree' => $this->faker->randomElement(['B.Tech', 'B.E.', 'M.Tech', 'MCA']),
            'batch' => $this->faker->randomElement(['2020', '2021', '2022', '2023', '2024', '2025']),
            'apply_link' => $this->faker->url(),
            'branch' => $this->faker->randomElement(['CSE', 'IT', 'ECE', 'ME', 'CE']),
            'job_type' => $this->faker->randomElement(['Full-Time', 'Part-Time', 'Internship', 'Remote']),
            'experience' => $this->faker->randomElement(['0', '1', '2', '3', '4', '5']),
            'ctc' => $this->faker->numberBetween(3, 30).' LPA',
            'location' => $this->faker->city(),
            'is_fraud' => $this->faker->boolean(5),
            'report_reason' => $this->faker->optional()->randomElement(JobReportReason::cases())?->value,
            'company_logo' => 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg',
            'created_at' => now(),
        ];

    }
}
