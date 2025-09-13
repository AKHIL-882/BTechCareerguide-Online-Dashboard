<?php

use App\Http\Controllers\StandardDataController;
use Illuminate\Support\Facades\Route;

Route::prefix('standard-data')->group(function () {
    Route::get('/config/home', [StandardDataController::class, 'configHome']);
    Route::get('/', [StandardDataController::class, 'index']);
});
