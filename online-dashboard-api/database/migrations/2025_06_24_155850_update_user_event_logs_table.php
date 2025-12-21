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
        Schema::table('user_event_logs', function (Blueprint $table) {

            /*
             |------------------------------------------------------------
             | Remove old columns
             |------------------------------------------------------------
             | IMPORTANT:
             | These columns MUST exist before running this migration.
             | If this migration already failed once, rollback first.
             */
            $table->dropColumn('email');
            $table->dropColumn('action');
            $table->dropColumn('status');
            $table->dropTimestamps();

            /*
             |------------------------------------------------------------
             | Add new columns
             |------------------------------------------------------------
             */
            $table->string('category', 191)->nullable();
            $table->string('event_type', 191)->nullable();
            $table->longText('data')->nullable(); // JSON stored as text (MySQL-safe)
            $table->string('updated_by_name', 191)->nullable();

            /*
             |------------------------------------------------------------
             | Re-add timestamps
             |------------------------------------------------------------
             */
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_event_logs', function (Blueprint $table) {

            /*
             |------------------------------------------------------------
             | Remove new columns
             |------------------------------------------------------------
             */
            $table->dropColumn('category');
            $table->dropColumn('event_type');
            $table->dropColumn('data');
            $table->dropColumn('updated_by_name');
            $table->dropTimestamps();

            /*
             |------------------------------------------------------------
             | Restore old columns
             |------------------------------------------------------------
             */
            $table->string('email', 191)->nullable();
            $table->longText('action')->nullable(); // was json earlier
            $table->string('status', 191)->nullable();

            $table->timestamps();
        });
    }
};
