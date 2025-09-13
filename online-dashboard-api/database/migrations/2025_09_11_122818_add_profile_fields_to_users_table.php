<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->index();
            $table->string('education')->nullable();
            $table->string('status')->nullable();
            $table->integer('experience_years')->nullable();
            $table->string('photo_drive_id')->nullable();
            $table->string('photo_link')->nullable();
            $table->string('resume_drive_id')->nullable();
            $table->string('resume_link')->nullable();
            $table->string('drive_folder_id')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'education',
                'status',
                'experience_years',
                'photo_drive_id',
                'photo_link',
                'resume_drive_id',
                'resume_link',
                'drive_folder_id',
            ]);
        });
    }
};
