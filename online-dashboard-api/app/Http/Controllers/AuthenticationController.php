<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RefreshRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Responses\ApiResponse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Laravel\Passport\RefreshTokenRepository;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class AuthenticationController extends Controller
{
    public function signUp(SignupRequest $request): JsonResponse
    {

        try {

            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
            ];

            //creating a new user
            $user = User::createUser($data);

            //generate access token using helper function
            $tokenData = generateAccessToken($user, $request->password);

            //check if token generation failed
            if (! $tokenData) {
                //delete the user if token generation fails
                $user->delete();

                return ApiResponse::message('Token generation failed')
                    ->response(Response::HTTP_BAD_REQUEST);
            }

            Auth::login($user);

            // Start a session manually
            if (! Session::isStarted()) {
                Session::start();
            }

            return ApiResponse::message('User Created Successfully')
                ->getTokens($tokenData)
                ->response(Response::HTTP_CREATED);

        } catch (Throwable $e) {

            return ApiResponse::message($e->getMessage())
                ->response(Response::HTTP_BAD_REQUEST);
        }

    }

    public function login(LoginRequest $request): JsonResponse
    {

        try {
            $credentials = request(['email', 'password']);

            // validate the user
            $user = User::where('email', $credentials['email'])->first();

            if (! $user || ! Hash::check($credentials['password'], $user->password)) {
                return ApiResponse::message('Unauthenticated')
                    ->response(Response::HTTP_UNAUTHORIZED);
            }

            //generate access token using helper function
            $tokenData = generateAccessToken($user, $request->password);

            //checking if token generation failed
            if (isset($tokenData['error'])) {
                return ApiResponse::message($tokenData['error'])
                    ->response(Response::HTTP_BAD_REQUEST);
            }

            // Login the user
            Auth::login($user);

            // Start a session manually
            if (! Session::isStarted()) {
                Session::start();
            }

            //success response if tokens are generated successfully
            return ApiResponse::message('Sccessufully logged in')
                ->getTokens($tokenData)
                ->response(Response::HTTP_OK);

        } catch (Throwable $e) {
            return ApiResponse::message($e->getMessage())
                ->response(Response::HTTP_BAD_REQUEST);
        }

    }

    // Revoke the access token
    public function logout(Request $request)
    {
        //destroying the session
        Session::invalidate();

        //regenerate the session ID to prevent session fixation attacks
        Session::regenerateToken();

        $user = Auth::user();
        $tokens = Auth::user()->tokens;
        // Check if user exists and has an active token
        if ($user && $tokens) {

            foreach ($tokens as $token) {
                $token->revoke();
                $refreshTokenRepository = app(RefreshTokenRepository::class);
                $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($token->id);
            }

            return ApiResponse::message('Successfully logged out')
                ->response(Response::HTTP_OK);

        } else {
            return ApiResponse::message('No active access token found for the user')
                ->response(Response::HTTP_BAD_REQUEST);
        }

    }

    public function refreshAccessToken(RefreshRequest $request)
    {

        $refreshToken = $request->refresh_token;

        try {
            $tokenData = refreshAccessToken($refreshToken);

            // Return the response (new access and refresh tokens)
            return ApiResponse::message('Tokens Successfully created!')
                ->getTokens($tokenData)
                ->response(Response::HTTP_OK);

        } catch (Throwable $e) {
            return ApiResponse::message('The refresh token is invalid or expired')
                ->response(Response::HTTP_BAD_REQUEST);
        }

    }
}
