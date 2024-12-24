<?php

namespace Database\Seeders;

use App\Models\JobOpportunity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobOpportunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JobOpportunity::factory()->count(50)->create();
    }
}
