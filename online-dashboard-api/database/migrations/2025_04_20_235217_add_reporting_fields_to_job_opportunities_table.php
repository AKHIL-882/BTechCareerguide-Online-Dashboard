<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_opportunities', function (Blueprint $table) {
            $table->boolean('is_fraud')->default(false);
            $table->string('report_reason')->nullable();
            $table->text('report_message')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('job_opportunities', function (Blueprint $table) {
            $table->dropColumn(['is_fraud', 'report_reason', 'report_message']);
        });
    }
};
