<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected $model = User::class;

    public function run(): void
    {
        User::factory()->count(10)->create();
    }
}
