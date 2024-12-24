<?php

use App\Http\Controllers\AddJobsController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CreateRolesAndPermissionsController;
use App\Http\Controllers\ForgetPasswordController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'api'])->group(function () {

    Route::match(['post', 'get'], '/logout', [AuthenticationController::class, 'logout']);

    Route::post('refresh-token', [AuthenticationController::class, 'refreshAccessToken']);

    Route::prefix('jobs')->group(function () {
        Route::post('create-new-job', [AddJobsController::class, 'store']);

        Route::post('update-job/{id}', [AddJobsController::class, 'update']);

        Route::post('delete-job/{id}', [AddJobsController::class, 'destroy']);

        Route::post('show-job/{id}', [AddJobsController::class, 'show']);

        Route::get('get-all-jobs', [AddJobsController::class, 'index']);
    });

});

Route::middleware(['guest', 'throttle:10,1'])->group(function () {

    Route::post('reset-password', [ForgetPasswordController::class, 'resetPassword']);
    Route::post('update-password', [ForgetPasswordController::class, 'updatePassword']);
    Route::post('signup', [AuthenticationController::class, 'signup']);
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::get('create-user-admin-role', [CreateRolesAndPermissionsController::class, 'createUserAndAdminRole']);

});
