<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResendVerificationRequest;
use App\Http\Requests\RefreshRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Http\Responses\ApiResponse;
use App\Services\Contracts\AuthServiceInterface;
use App\Exceptions\EmailVerificationRequiredException;
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

            $verificationData = $this->authService->register($request->only('name', 'email', 'password'));

            return ApiResponse::setMessage('Verification email sent')
                ->mergeResults($verificationData)
                ->response(Response::HTTP_CREATED);
        } catch (Throwable $e) {

            // Add logging here if signup failures need diagnostics.

            return ApiResponse::setMessage('Signup failed')
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }


    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $tokenData = $this->authService->login($request->email, $request->password);

            $user = auth()?->user();

            return ApiResponse::setMessage('Successfully logged in')
                ->mergeResults(array_merge(
                    $tokenData,
                    ['user_email' => $user?->email ?? $request->email]
                ))
                ->response(Response::HTTP_OK);
        } catch (EmailVerificationRequiredException $e) {
            return ApiResponse::setMessage($e->getMessage())
                ->mergeResults([
                    'requires_verification' => true,
                    'email' => $e->email,
                    'verification_token' => $e->token,
                    'expires_in' => $e->expiresAt?->diffInSeconds(now()),
                ])
                ->response(Response::HTTP_FORBIDDEN);
        } catch (AuthenticationException $e) {
            return ApiResponse::setMessage('Unauthenticated')
                ->response(Response::HTTP_UNAUTHORIZED);
        } catch (Throwable $e) {

            // Add logging here if login failures need diagnostics.

            return ApiResponse::setMessage('Login failed')
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

            // Event logging removed; reintroduce here if logout auditing is needed.

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

    public function verifyEmail(VerifyEmailRequest $request): JsonResponse
    {
        try {
            $tokenData = $this->authService->verifyEmail(
                $request->email,
                $request->otp,
                $request->token
            );

            return ApiResponse::setMessage('Email verified successfully')
                ->mergeResults($tokenData)
                ->response(Response::HTTP_OK);
        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage() ?: 'Verification failed')
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }

    public function resendVerificationEmail(ResendVerificationRequest $request): JsonResponse
    {
        try {
            $verificationData = $this->authService->resendVerification($request->email);

            return ApiResponse::setMessage('Verification email resent')
                ->mergeResults($verificationData)
                ->response(Response::HTTP_OK);
        } catch (Throwable $e) {
            return ApiResponse::setMessage($e->getMessage() ?: 'Unable to resend verification email')
                ->response(Response::HTTP_BAD_REQUEST);
        }
    }
}
