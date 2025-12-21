<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('user_event_logs')) {
            return;
        }

        Schema::table('user_event_logs', function (Blueprint $table) {

            // Drop old columns safely
            foreach (['email', 'action', 'status'] as $column) {
                if (Schema::hasColumn('user_event_logs', $column)) {
                    $table->dropColumn($column);
                }
            }

            // Drop timestamps if they exist
            if (
                Schema::hasColumn('user_event_logs', 'created_at') &&
                Schema::hasColumn('user_event_logs', 'updated_at')
            ) {
                $table->dropTimestamps();
            }

            // Add new columns
            if (!Schema::hasColumn('user_event_logs', 'category')) {
                $table->string('category', 191)->nullable();
            }

            if (!Schema::hasColumn('user_event_logs', 'event_type')) {
                $table->string('event_type', 191)->nullable();
            }

            if (!Schema::hasColumn('user_event_logs', 'data')) {
                $table->longText('data')->nullable(); // ✅ JSON-safe replacement
            }

            if (!Schema::hasColumn('user_event_logs', 'updated_by_name')) {
                $table->string('updated_by_name', 191)->nullable();
            }

            // Re-add timestamps
            $table->timestamps();
        });
    }

    public function down(): void
    {
        if (!Schema::hasTable('user_event_logs')) {
            return;
        }

        Schema::table('user_event_logs', function (Blueprint $table) {

            // Drop new columns safely
            foreach (['category', 'event_type', 'data', 'updated_by_name'] as $column) {
                if (Schema::hasColumn('user_event_logs', $column)) {
                    $table->dropColumn($column);
                }
            }

            // Drop timestamps
            if (
                Schema::hasColumn('user_event_logs', 'created_at') &&
                Schema::hasColumn('user_event_logs', 'updated_at')
            ) {
                $table->dropTimestamps();
            }

            // Restore old columns
            if (!Schema::hasColumn('user_event_logs', 'email')) {
                $table->string('email', 191)->nullable();
            }

            if (!Schema::hasColumn('user_event_logs', 'action')) {
                $table->longText('action')->nullable(); // was json → longText
            }

            if (!Schema::hasColumn('user_event_logs', 'status')) {
                $table->string('status', 191)->nullable();
            }

            $table->timestamps();
        });
    }
};
