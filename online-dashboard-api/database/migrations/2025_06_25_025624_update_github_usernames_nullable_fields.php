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
        Schema::table('github_usernames', function (Blueprint $table) {
            $table->string('github_username')->nullable()->change();
            $table->string('email')->nullable()->change();
            $table->string('repo_access')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('github_usernames', function (Blueprint $table) {
            $table->string('github_username')->nullable(false)->change();
            $table->string('email')->nullable(false)->change();
            $table->string('repo_access')->nullable(false)->change();
        });
    }
};
