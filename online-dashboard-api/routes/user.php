<?php

use App\Http\Controllers\AdminProjectsController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\JobOpportunityController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProjectsController;
use App\Http\Controllers\ResumeAnalysisController;
use App\Http\Middleware\UserRoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('jobs')->group(function () {

    Route::get('/', [JobOpportunityController::class, 'index']);
    Route::get('/filter', [JobOpportunityController::class, 'getFilterJobs']);
});

Route::middleware(['auth:api', 'api', UserRoleMiddleware::class])->group(function () {

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::post('/profile', [ProfileController::class, 'store']);

    Route::get('/user-details', [UserController::class, 'show']);

    Route::get('/dashboard-stats', [UserController::class, 'showDashboardStats']);

    Route::post('/jobs/{id}/report', [JobOpportunityController::class, 'report']);
    Route::post('/jobs/{job}/apply', [ResumeAnalysisController::class, 'markApplied']);
    Route::post('/resume-based-jobs', [ResumeAnalysisController::class, 'resumeBasedJobs']);

    Route::prefix('user-projects')->group(function () {
        Route::get('/', [UserProjectsController::class, 'index']);
        Route::post('create', [UserProjectsController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [UserProjectsController::class, 'update']);

            Route::delete('delete', [UserProjectsController::class, 'destroy']);

            Route::get('show', [UserProjectsController::class, 'show']);
        });

        Route::post('search', [UserProjectsController::class, 'search']);
    });

    Route::prefix('admin-projects')->group(function () {

        Route::get('/', [AdminProjectsController::class, 'index']);
    });

    // show all projects for payments this will give you the user specific and admin projects
    Route::get('all-projects', [UserProjectsController::class, 'showAllProjectsForPayment']);

    // upload payement screenshot
    Route::post('payment-request', [PaymentsController::class, 'store']);

    Route::prefix('bookings')->group(function () {
        Route::get('/', [BookingController::class, 'index']);
        Route::post('/create', [BookingController::class, 'store']);
        Route::delete('/{id}', [BookingController::class, 'destroy']);
        Route::put('/{id}', [BookingController::class, 'update']);
    });

    Route::prefix('testimonials')->group(function () {
        Route::get('/', [TestimonialController::class, 'index'])->name('testimonials.index');
        Route::post('/', [TestimonialController::class, 'store'])->name('testimonials.store');
        Route::get('/{testimonial}', [TestimonialController::class, 'show'])->name('testimonials.show');
        Route::put('/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
        Route::delete('/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
    });
});
