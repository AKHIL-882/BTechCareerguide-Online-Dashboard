<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class CreateRolesAndPermissionsController extends Controller
{
    public function createUserAndAdminRole()
    {
        try {
            $userRole = Role::create(['name' => 'user']);
            $AdminRole = Role::create(['name' => 'admin']);

            return ApiResponse::message('user and admin roles created successfully')->response(Response::HTTP_OK);
        } catch (Throwable $e) {
            return ApiResponse::message('Roles creation failed')->response(Response::HTTP_BAD_REQUEST);
        }

    }
}
