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
        $jobs = JobOpportunity::getLatestJobs();
        $testimonials = Testimonial::getLatestTestimonials();

        config([
            // Cast collections to arrays so config caching can serialize the values.
            'home.jobs' => $jobs->toArray(),
            'home.testimonials' => $testimonials->toArray(),
        ]);
    }
}
