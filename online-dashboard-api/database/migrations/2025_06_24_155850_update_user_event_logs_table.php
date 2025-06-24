<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_event_logs', function (Blueprint $table) {
            // Drop old fields
            $table->dropColumn(['email', 'action', 'status', 'created_at', 'updated_at']);

            // Add new fields
            $table->string('category')->nullable();
            $table->string('event_type')->nullable();
            $table->json('data')->nullable();
            $table->string('updated_by_name')->nullable();

            // Re-add timestamps at the end
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('user_event_logs', function (Blueprint $table) {
            // Drop new fields
            $table->dropColumn(['category', 'event_type', 'data', 'updated_by_name', 'created_at', 'updated_at']);

            // Re-add old fields
            $table->string('email')->nullable();
            $table->json('action')->nullable();
            $table->string('status')->nullable();
            $table->timestamps(); // This re-adds created_at and updated_at
        });
    }
};
