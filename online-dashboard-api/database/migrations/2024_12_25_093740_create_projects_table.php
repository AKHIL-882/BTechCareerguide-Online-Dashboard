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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('company_name')->nullable();
            $table->text('youtube_video_link')->nullable();
            $table->text('payment_link')->nullable();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text('project_name')->nullable();
            $table->string('technical_skills')->nullable();
            $table->text('project_description')->nullable();
            $table->integer('days_to_complete')->nullable();
            $table->text('document_name')->nullable();
            $table->integer('project_status')->default(1);
            $table->integer('payment_status')->default(1);
            $table->boolean('is_admin_project')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
