<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@btechcareerguide.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('admin@btechcareerguide.com'), 
            ]
        );

        // Assign the admin role
        $admin->assignRole('admin');

        $this->command->info('Admin user created successfully!');
    }
}
