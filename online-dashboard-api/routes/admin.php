<?php

use App\Http\Controllers\AdminProjectsController;
use App\Http\Controllers\JobOpportunityController;
use App\Http\Controllers\PaymentsController;
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



    Route::prefix('admin-projects')->group(function () {

        Route::get('/', [AdminProjectsController::class, 'index']);
        Route::post('create', [AdminProjectsController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [AdminProjectsController::class, 'update']);

            Route::delete('delete', [AdminProjectsController::class, 'destroy']);

            Route::get('show', [AdminProjectsController::class, 'show']);
        });
    });


    //show-all-payment-requests
    Route::get('show-all-payment-request', [PaymentsController::class, 'index']) ;


   

});
