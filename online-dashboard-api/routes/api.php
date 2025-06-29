<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CreateRolesAndPermissionsController;
use App\Http\Controllers\ForgetPasswordController;
use App\Http\Controllers\GithubController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'api'])->group(function () {

    Route::match(['post', 'get'], '/logout', [AuthenticationController::class, 'logout']);

    Route::post('refresh-token', [AuthenticationController::class, 'refreshAccessToken']);

    Route::post('/create-order', [PaymentController::class, 'createRazorPayOrder']);
    Route::post('/verify-payment', [PaymentController::class, 'verifyPayment']);

    Route::get('set-access', [GithubController::class, 'addCollaboratorToRepo']);
    Route::post('/users/{user}/github/store', [GithubController::class, 'storeUserGithubId']);

    // notification routes
    Route::get('notifications', [NotificationController::class, 'unread']);
    Route::post('create-notification', [NotificationController::class, 'createNotification']);
    Route::post('mark-as-read', [NotificationController::class, 'markAsRead']);

    // bulk insert jobs

    Route::post('bulk-insert-jobs', [\App\Http\Controllers\JobOpportunityController::class, 'bulkInsert']);

});

Route::middleware(['guest', 'throttle:10,1'])->group(function () {

    Route::post('reset-password', [ForgetPasswordController::class, 'resetPassword']);
    Route::post('update-password', [ForgetPasswordController::class, 'updatePassword']);
    Route::post('signup', [AuthenticationController::class, 'signup']);
    Route::post('login', [AuthenticationController::class, 'login']);

    Route::get('create-user-admin-role', [CreateRolesAndPermissionsController::class, 'createUserAndAdminRole']);

});

// Admin routes
require __DIR__.'/admin.php';

// User routes
require __DIR__.'/user.php';

require __DIR__.'/config.php';
