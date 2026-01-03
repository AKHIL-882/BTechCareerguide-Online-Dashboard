<?php

use App\Http\Controllers\AdminProjectsController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminTransactionController;
use App\Http\Controllers\JobOpportunityController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ProjectAccessController;
use App\Http\Middleware\AdminRoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'api', AdminRoleMiddleware::class])->group(function () {

    Route::prefix('jobs')->group(function () {

        Route::get('/', [JobOpportunityController::class, 'index']);
        Route::post('create', [JobOpportunityController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [JobOpportunityController::class, 'update']);

            Route::delete('delete', [JobOpportunityController::class, 'destroy']);

            Route::get('show', [JobOpportunityController::class, 'show']);
        });

    });

    Route::prefix('admin_projects')->group(function () {

        Route::get('/', [AdminProjectsController::class, 'index']);
        Route::post('create', [AdminProjectsController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [AdminProjectsController::class, 'update']);

            Route::delete('delete', [AdminProjectsController::class, 'destroy']);

            Route::get('show', [AdminProjectsController::class, 'show']);
        });

        Route::post('update-project-status', [AdminProjectsController::class, 'updateStatus']);
    });

    // show-all-payment-requests
    Route::get('show_all_payment_request', [PaymentsController::class, 'index']);
    Route::get('transactions', [AdminTransactionController::class, 'index']);

    Route::get('projects/{project}/access-context', [ProjectAccessController::class, 'context']);
    Route::post('projects/{project}/grant-access', [ProjectAccessController::class, 'grant']);

    Route::prefix('admin/bookings')->group(function () {
        Route::get('/', [BookingController::class, 'getAllBookings']);
        Route::put('/{id}/update-status', [BookingController::class, 'updateStatus']);
    });
});
