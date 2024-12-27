<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class UserProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'project_name' => fake()->name(),
            'technical_skills' => 'React|Node|Laravel',
            'project_description' => fake()->text(),
            'days_to_complete' => random_int(1, 20),
            'document_name' => fake()->url(),
        ];
    }
}
