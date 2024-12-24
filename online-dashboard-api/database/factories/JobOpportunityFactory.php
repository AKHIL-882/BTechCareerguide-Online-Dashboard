<?php

namespace Database\Factories;

use App\Models\JobOpportunity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobOpportunity>
 */
class JobOpportunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


     protected $model = JobOpportunity::class;

    public function definition(): array
    {
        return [
        'company_name' => fake()->company(),
        'role' => fake()->jobTitle(),
        'batch' => "2022/24/23/25",
        'apply_link' => fake()->url(),
        'qualification' => "Btech in cs,ece,eee,mech",
        ];
    }
}
