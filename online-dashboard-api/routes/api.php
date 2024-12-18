<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ForgetPasswordController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'api'])->group(function () {

    Route::match(['post', 'get'], '/logout', [AuthenticationController::class, 'logout']);

    Route::post('refresh-token', [AuthenticationController::class, 'refreshAccessToken']);

});

Route::middleware(['guest', 'throttle:10,1'])->group(function () {

    Route::post('reset-password', [ForgetPasswordController::class, 'resetPassword']);
    Route::post('update-password', [ForgetPasswordController::class, 'updatePassword']);
    Route::post('signup', [AuthenticationController::class, 'signup']);
    Route::post('login', [AuthenticationController::class, 'login']);

});
