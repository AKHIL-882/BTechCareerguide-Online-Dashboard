<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::post('signup', [AuthenticationController::class, 'signup']) ;

Route::post('login', [AuthenticationController::class, 'login']) ;

Route::middleware(['auth:api', 'api'])->group(function() {

    Route::match(['post', 'get'], '/logout', [AuthenticationController::class, 'logout']) ;

    Route::post('refresh-token', [AuthenticationController::class, 'refreshAccessToken']) ;

}) ;

