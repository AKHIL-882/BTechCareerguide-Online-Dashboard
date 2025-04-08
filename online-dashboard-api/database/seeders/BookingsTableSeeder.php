<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bookings = [
            [
                'user_id' => 1,
                'date' => Carbon::today()->addDays(1),
                'time' => '10:00:00',
                'title' => 'Meeting with Client',
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'date' => Carbon::today()->addDays(2),
                'time' => '14:00:00',
                'title' => 'Team Standup',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'date' => Carbon::today()->addDays(3),
                'time' => '16:30:00',
                'title' => 'Project Review',
                'status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('bookings')->insert($bookings);
    }
}
