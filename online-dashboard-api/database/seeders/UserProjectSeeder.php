<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\UserProject;
use Illuminate\Database\Seeder;

class UserProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected $model = Project::class;

    public function run(): void
    {
        UserProject::factory()->count(5)->create();
    }
}
