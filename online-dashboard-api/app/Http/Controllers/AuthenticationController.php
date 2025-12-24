<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RefreshRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Responses\ApiResponse;
use App\Services\Contracts\AuthServiceInterface;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AuthenticationController extends Controller
{
    public function __construct(private readonly AuthServiceInterface $authService) {}

    public function signUp(SignupRequest $request): JsonResponse
    {
        try {

            $tokenData = $this->authService->register($request->only('name', 'email', 'password'));

            return ApiResponse::setMessage('Account Created Successfully')
                ->mergeResults($tokenData)
                ->response(Response::HTTP_CREATED);
        } catch (Throwable $e) {

            return ApiResponse::setMessage($e->getMessage())
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $tokenData = $this->authService->login($request->email, $request->password);

            return ApiResponse::setMessage('Successfully logged in')
                ->mergeResults($tokenData)
                ->response(Response::HTTP_OK);
        } catch (AuthenticationException $e) {
            return ApiResponse::setMessage('Unauthenticated')
                ->response(Response::HTTP_UNAUTHORIZED);
        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage())
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    // Revoke the access token
    public function logout(Request $request)
    {
        $user = $request->user();
        $tokens = $user?->tokens;
        // Check if user exists and has an active token
        if ($user && $tokens) {

            $this->authService->logout($user);

            return ApiResponse::setMessage('Successfully logged out')
                ->response(Response::HTTP_OK);
        } else {
            return ApiResponse::setMessage('No active access token found for the user')
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    public function refreshAccessToken(RefreshRequest $request)
    {
        $refreshToken = $request->refresh_token;
        try {
            $tokenData = $this->authService->refresh($refreshToken);

            // Return the response (new access and refresh tokens)
            return ApiResponse::setMessage('Tokens Successfully created!')
                ->mergeResults($tokenData)
                ->response(Response::HTTP_OK);
        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage() ?: 'The refresh token is invalid or expired')
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }
}
