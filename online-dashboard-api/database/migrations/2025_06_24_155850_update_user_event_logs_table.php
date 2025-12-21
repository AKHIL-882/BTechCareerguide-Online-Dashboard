<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // if (!Schema::hasTable('user_event_logs')) {
        //     return;
        // }

        // Schema::table('user_event_logs', function (Blueprint $table) {

        //     // Drop old columns if they exist
        //     if (Schema::hasColumn('user_event_logs', 'email')) {
        //         $table->dropColumn('email');
        //     }

        //     if (Schema::hasColumn('user_event_logs', 'action')) {
        //         $table->dropColumn('action');
        //     }

        //     if (Schema::hasColumn('user_event_logs', 'status')) {
        //         $table->dropColumn('status');
        //     }

        //     if (
        //         Schema::hasColumn('user_event_logs', 'created_at') &&
        //         Schema::hasColumn('user_event_logs', 'updated_at')
        //     ) {
        //         $table->dropTimestamps();
        //     }

        //     // Add new columns if they do not exist
        //     if (!Schema::hasColumn('user_event_logs', 'category')) {
        //         $table->string('category', 191)->nullable();
        //     }

        //     if (!Schema::hasColumn('user_event_logs', 'event_type')) {
        //         $table->string('event_type', 191)->nullable();
        //     }

        //     if (!Schema::hasColumn('user_event_logs', 'data')) {
        //         $table->longText('data')->nullable(); // JSON-safe
        //     }

        //     if (!Schema::hasColumn('user_event_logs', 'updated_by_name')) {
        //         $table->string('updated_by_name', 191)->nullable();
        //     }

        //     // Re-add timestamps if missing
        //     if (
        //         !Schema::hasColumn('user_event_logs', 'created_at') &&
        //         !Schema::hasColumn('user_event_logs', 'updated_at')
        //     ) {
        //         $table->timestamps();
        //     }
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //     if (!Schema::hasTable('user_event_logs')) {
        //         return;
        //     }

        //     Schema::table('user_event_logs', function (Blueprint $table) {

        //         // Drop new columns if they exist
        //         if (Schema::hasColumn('user_event_logs', 'category')) {
        //             $table->dropColumn('category');
        //         }

        //         if (Schema::hasColumn('user_event_logs', 'event_type')) {
        //             $table->dropColumn('event_type');
        //         }

        //         if (Schema::hasColumn('user_event_logs', 'data')) {
        //             $table->dropColumn('data');
        //         }

        //         if (Schema::hasColumn('user_event_logs', 'updated_by_name')) {
        //             $table->dropColumn('updated_by_name');
        //         }

        //         if (
        //             Schema::hasColumn('user_event_logs', 'created_at') &&
        //             Schema::hasColumn('user_event_logs', 'updated_at')
        //         ) {
        //             $table->dropTimestamps();
        //         }

        //         // Restore old columns if missing
        //         if (!Schema::hasColumn('user_event_logs', 'email')) {
        //             $table->string('email', 191)->nullable();
        //         }

        //         if (!Schema::hasColumn('user_event_logs', 'action')) {
        //             $table->longText('action')->nullable();
        //         }

        //         if (!Schema::hasColumn('user_event_logs', 'status')) {
        //             $table->string('status', 191)->nullable();
        //         }

        //         $table->timestamps();
        //     });
    }
};
