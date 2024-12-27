<?php

use App\Http\Controllers\AdminProjectsController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CreateRolesAndPermissionsController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\JobOpportunityController;
use App\Http\Controllers\UserProjectsController;
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

    Route::prefix('admin-projects')->group(function () {
        Route::get('/', [AdminProjectsController::class, 'index']);
        Route::post('create', [AdminProjectsController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [AdminProjectsController::class, 'update']);

            Route::delete('delete', [AdminProjectsController::class, 'destroy']);

            Route::get('show', [AdminProjectsController::class, 'show']);
        });
    });

    Route::prefix('user-projects')->group(function () {
        Route::get('/', [UserProjectsController::class, 'index']);
        Route::post('create', [UserProjectsController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [UserProjectsController::class, 'update']);

            Route::delete('delete', [UserProjectsController::class, 'destroy']);

            Route::get('show', [UserProjectsController::class, 'show']);
        });
    });

});

Route::middleware(['guest', 'throttle:10,1'])->group(function () {

    Route::post('reset-password', [ForgetPasswordController::class, 'resetPassword']);
    Route::post('update-password', [ForgetPasswordController::class, 'updatePassword']);
    Route::post('signup', [AuthenticationController::class, 'signup']);
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::get('create-user-admin-role', [CreateRolesAndPermissionsController::class, 'createUserAndAdminRole']);

});
