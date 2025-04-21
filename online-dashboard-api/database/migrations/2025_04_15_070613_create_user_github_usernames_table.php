<?php

use App\Eums\RepoAccessStatus;
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
        Schema::create('user_github_usernames', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained() ;
            $table->string('github_username');
            $table->string('email')->nullable();
            $table->string('repo_access');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_github_usernames');
    }
};
