<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RefreshRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\RefreshTokenRepository;
use Nyholm\Psr7\Factory\Psr17Factory;
use Throwable;

class AuthenticationController extends Controller
{
    public function signUp(SignupRequest $request)
    {

        try {

            $data = [
                'name' => $request->name ,
                'email' => $request->email,
                'password' => $request->password
            ] ;
            
            //creating a new user
            $user = User::createUser($data) ;

            //generate access token using helper function
            $tokenData = generateAccessToken($user, $request->password);


            //check if token generation failed
            if (! $tokenData) {
                //delete the user if token generation fails
                $user->delete();

                return response()->json([
                    'message' => 'Token generation failed',
                ], 400);
            }

            Auth::login($user);

            // Start a session manually
            if (! Session::isStarted()) {
                Session::start();
            }

            // Success response with tokens
            return response()->json([
                'message' => 'User Created Successfully',
                'token_type' => $tokenData['token_type'],
                'access_token' => $tokenData['access_token'],
                'refresh_token' => $tokenData['refresh_token'],
                'expires_in' => $tokenData['expires_in'],
                'user' => $user,
            ], 201);
            // write function to render the default keys -> func1()
            // write fuction mergeresponse => which takes params () =>  func1()
            // return ApiResponse::displayResponse($tokenData)->responseOK();
            // return ApiResponse::setMessage("asdfasdf")->mergeResponse($tokenData)->responseOk();
        } catch (Throwable $e) {
            // Handle exceptions
            return response()->json([
                'message' => 'An error occurred during signup or token generation',
                'error' => $e->getMessage(),
            ], 400);
        }

    }

    public function login(LoginRequest $request)
    {

        try {
            $credentials = request(['email', 'password']);

            // validate the user
            $user = User::where('email', $credentials['email'])->first();

            if (! $user || ! Hash::check($credentials['password'], $user->password)) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            //generate access token using helper function
            $tokenData = generateAccessToken($user, $request->password);

            //checking if token generation failed
            if (isset($tokenData['error'])) {
                return response()->json([
                    'message' => 'Token generation failed',
                    'error' => $tokenData['error'],
                    'error_description' => $tokenData['error_description'] ?? ' ',
                ], 400);
            }

            // Login the user
            Auth::login($user);

            // Start a session manually
            if (! Session::isStarted()) {
                Session::start();
            }

            //success response if tokens are generated successfully
            return response()->json([
                'message' => 'Sccessufully logged in',
                'token_type' => $tokenData['token_type'],
                'access_token' => $tokenData['access_token'],
                'refresh_token' => $tokenData['refresh_token'],
                'expires_in' => $tokenData['expires_in'],
                'user' => Auth::user(),
            ], 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'An error occurred during login or token generation',
                'error' => $e->getMessage(),
            ], 400);
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

            return response()->json(['message' => 'Successfully logged out'], 200);
        } else {
            return response()->json(['message' => 'No active access token found for the user'], 400);
        }

    }

    public function refreshAccessToken(RefreshRequest $request)
    {

        $refreshToken = $request->refresh_token;

        try {
            // Create an instance of AccessTokenController to handle the request
            $accessTokenController = app(AccessTokenController::class);

            // Create a Psr17Factory instance to generate PSR-7 compatible request
            $psr17Factory = new Psr17Factory;

            // Create a ServerRequestInterface instance with the refresh token request
            $serverRequest = $psr17Factory->createServerRequest(
                'POST',
                'http://127.0.0.1:8000/oauth/token'
            )->withParsedBody([
                'grant_type' => 'refresh_token', // Use refresh_token grant type
                'refresh_token' => $refreshToken, // Pass the refresh token here
                'client_id' => config('passport.password_client.id'),
                'client_secret' => config('passport.password_client.secret'),
                'scope' => '',

            ]);

            // Handle the token refresh request using the AccessTokenController
            $response = $accessTokenController->issueToken($serverRequest);

            $responseContent = $response->getContent();

            //decoding psr-7 response
            $tokenData = json_decode($responseContent, true);
            // Return the response (new access and refresh tokens)

            return response()->json([
                'message' => 'Tokens Successfully created!',
                'access_token' => $tokenData['access_token'],
                'refresh_token' => $tokenData['refresh_token'],
            ], 200);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'The refresh token is invalid or expired',
            ], 400);
        }

    }
}
