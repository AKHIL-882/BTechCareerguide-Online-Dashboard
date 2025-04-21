<?php

namespace Database\Factories;

use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'feedback' => $this->faker->paragraph(),
            'job_role' => $this->faker->jobTitle(),
            'company' => $this->faker->company(),
        ];
    }
}
