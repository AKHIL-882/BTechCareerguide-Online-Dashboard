<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GithubController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\CreateRolesAndPermissionsController;

Route::middleware(['auth:api', 'api'])->group(function () {

    Route::match(['post', 'get'], '/logout', [AuthenticationController::class, 'logout']);

    Route::post('refresh-token', [AuthenticationController::class, 'refreshAccessToken']);

});

Route::middleware(['guest', 'throttle:10,1'])->group(function () {

    Route::post('reset-password', [ForgetPasswordController::class, 'resetPassword']);
    Route::post('update-password', [ForgetPasswordController::class, 'updatePassword']);
    Route::post('signup', [AuthenticationController::class, 'signup']);
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::get('create-user-admin-role', [CreateRolesAndPermissionsController::class, 'createUserAndAdminRole']);

});

Route::get('set-access', [GithubController::class, 'addCollaboratorToRepo']);

// Admin routes
require __DIR__.'/admin.php';

// User routes
require __DIR__.'/user.php';
