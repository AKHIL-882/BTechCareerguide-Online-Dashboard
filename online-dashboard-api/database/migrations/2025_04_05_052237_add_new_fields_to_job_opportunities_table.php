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
        Schema::table('job_opportunities', function (Blueprint $table) {
            $table->string('branch')->nullable()->after('batch');
            $table->string('degree')->nullable()->after('branch');
            $table->string('job_type')->nullable()->after('degree');
            $table->string('experience')->nullable()->after('job_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_opportunities', function (Blueprint $table) {
            $table->dropColumn([
                'branch',
                'degree',
                'job_type',
                'experience',
            ]);
        });
    }
};
