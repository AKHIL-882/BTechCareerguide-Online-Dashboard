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
            $table->string('company_name')->nullable()->change();
            $table->string('role')->nullable()->change();
            $table->string('batch')->nullable()->change();
            $table->text('apply_link')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_opportunities', function (Blueprint $table) {
            $table->string('company_name')->nullable(false)->change();
            $table->string('role')->nullable(false)->change();
            $table->string('batch')->nullable(false)->change();
            $table->text('apply_link')->nullable(false)->change();
        });
    }
};
