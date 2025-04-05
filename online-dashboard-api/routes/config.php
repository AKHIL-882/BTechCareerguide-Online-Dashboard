<?php

use App\Http\Controllers\StandardDataController;
use Illuminate\Support\Facades\Route;

Route::prefix('standard-data')->group(function () {

    Route::get('/', [StandardDataController::class, 'index']);

});
