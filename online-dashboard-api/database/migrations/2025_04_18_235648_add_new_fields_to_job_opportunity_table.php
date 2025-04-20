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
            $table->string('ctc')->nullable()->after('batch');
            $table->string('company_logo')->nullable()->after('ctc');
            $table->string('location')->nullable()->after('company_logo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_opportunities', function (Blueprint $table) {
            $table->dropColumn([
                'ctc',
                'company_logo',
                'location',
            ]);
        });
    }
};
