<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CreateRolesAndPermissionsController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\JobOpportunityController;
use App\Http\Controllers\ProjectsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'api'])->group(function () {

    Route::match(['post', 'get'], '/logout', [AuthenticationController::class, 'logout']);

    Route::post('refresh-token', [AuthenticationController::class, 'refreshAccessToken']);


    Route::prefix('jobs')->group(function () {

        Route::get('/', [JobOpportunityController::class, 'index']);
        Route::post('create', [JobOpportunityController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [JobOpportunityController::class, 'update']);

            Route::delete('delete', [JobOpportunityController::class, 'destroy']);

            Route::get('show', [JobOpportunityController::class, 'show']);
        });

    });


    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjectsController::class, 'index']);
        Route::post('create', [ProjectsController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [ProjectsController::class, 'update']);

            Route::delete('delete', [ProjectsController::class, 'destroy']);

            Route::get('show', [ProjectsController::class, 'show']);
        });
    });

    Route::prefix('users')->group(function () {
        Route::prefix('{id}')->group(function () {
            Route::get('projects', [ProjectsController::class, 'showUserProjects']);
        } );
    });


});

Route::middleware(['guest', 'throttle:10,1'])->group(function () {

    Route::post('reset-password', [ForgetPasswordController::class, 'resetPassword']);
    Route::post('update-password', [ForgetPasswordController::class, 'updatePassword']);
    Route::post('signup', [AuthenticationController::class, 'signup']);
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::get('create-user-admin-role', [CreateRolesAndPermissionsController::class, 'createUserAndAdminRole']);

});
