<?php

use Illuminate\Support\Facades\Log;
use Nyholm\Psr7\Factory\Psr17Factory;
use Laravel\Passport\Http\Controllers\AccessTokenController;

if (! function_exists('generateAccessToken')) {

    function makePsr17Request($user, $password): bool|string
    {
        // Create an instance of AccessTokenController to handle the request
        $accessTokenController = app(AccessTokenController::class);

        // Create a Psr17Factory instance to generate PSR-7 compatible request
        $psr17Factory = new Psr17Factory;

        $oauth_token_uri = config('auth.oauth_token_uri');

        Log::info('Passport client config', [
            'id' => config('passport.password_client.id'),
            'secret' => config('passport.password_client.secret'),
            'uri' => $oauth_token_uri,
        ]);


        // Create a ServerRequestInterface instance with required parameters
        $serverRequest = $psr17Factory->createServerRequest(
            'POST',
            $oauth_token_uri
        )->withParsedBody([
            'grant_type' => 'password',
            'client_id' => config('passport.password_client.id'),
            'client_secret' => config('passport.password_client.secret'),
            'username' => $user->email,
            'password' => $password,
            'scope' => '',
        ]);

        // Handle the token request and get the response
        $response = $accessTokenController->issueToken($serverRequest);
        $responseContent = $response->getContent();

        return $responseContent;
    }

    /**
     * Generate access and refresh tokens for a user.
     *
     * @param  object  $user
     * @param  string  $password
     * @return array|null
     */
    function generateAccessToken($user, $password): mixed
    {
        try {
            info("Generating access token for user: " . $user->email);
            $responseContent = makePsr17Request($user, $password);
            Log::info('Response Content: ' . $responseContent);
            // Decode response into an array
            $tokenData = json_decode($responseContent, true);
            Log::info('Token Data: ' . json_encode($tokenData));
            // Return token data or null if an error occurred
            return isset($tokenData['error']) ? null : $tokenData;
        } catch (Throwable $e) {
            // deleteuser when tokengeneration fails
            $user->delete();

            return null; // in case of exception
        }
    }

    function makePsr17RequestForRefreshToken($refreshToken): bool|string
    {
        // Create an instance of AccessTokenController to handle the request
        $accessTokenController = app(AccessTokenController::class);

        // Create a Psr17Factory instance to generate PSR-7 compatible request
        $psr17Factory = new Psr17Factory;

        $oauth_token_uri = config('auth.oauth_token_uri');

        // Create a ServerRequestInterface instance with the refresh token request
        $serverRequest = $psr17Factory->createServerRequest(
            'POST',
            $oauth_token_uri
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

        return $responseContent;
    }

    /**
     * Generate access and refresh tokens for a user.
     *
     *
     * @param  string  $refreshToken
     * @return array|null
     */
    function refreshAccessToken($refreshToken): mixed
    {
        try {

            $responseContent = makePsr17RequestForRefreshToken($refreshToken);

            // Decode response into an array
            $tokenData = json_decode($responseContent, true);

            // Return token data or null if an error occurred
            return isset($tokenData['error']) ? null : $tokenData;
        } catch (Throwable $e) {

            return null; // in case of exception
        }
    }
}
