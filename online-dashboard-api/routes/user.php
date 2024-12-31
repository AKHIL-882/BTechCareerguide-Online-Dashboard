<?php


use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\UserProjectsController;
use App\Http\Middleware\UserRoleMiddleware;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;




Route::middleware(['auth:api', 'api', UserRoleMiddleware::class])->group(function () {
    
    Route::prefix('user-projects')->group(function () {
        Route::get('/', [UserProjectsController::class, 'index']);
        Route::post('create', [UserProjectsController::class, 'store']);

        Route::prefix('{id}')->group(function () {

            Route::put('update', [UserProjectsController::class, 'update']);

            Route::delete('delete', [UserProjectsController::class, 'destroy']);

            Route::get('show', [UserProjectsController::class, 'show']);
        });
    });


    //show all projects for payments this will give you the user specific and admin projects 
    Route::get('all-projects', [UserProjectsController::class, 'showAllProjectsForPayment']) ;


    //upload payement screenshot 
    Route::post('payment-request', [PaymentsController::class, 'store']) ;


});


