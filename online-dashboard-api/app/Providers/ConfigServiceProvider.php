<?php

namespace App\Providers;

use App\Models\JobOpportunity;
use Illuminate\Support\ServiceProvider;

class ConfigServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        config(['home.jobs' => JobOpportunity::getLatestJobs()]);
    }
}
