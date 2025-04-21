<?php

namespace App\Providers;

use App\Models\JobOpportunity;
use App\Models\Testimonial;
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
        config([
            'home.jobs' => JobOpportunity::getLatestJobs(),
            'home.testimonials' => Testimonial::getLatestTestimonials()]);
    }
}
