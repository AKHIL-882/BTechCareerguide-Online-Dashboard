<?php

use Laravel\Passport\Http\Controllers\AccessTokenController;
use Nyholm\Psr7\Factory\Psr17Factory;

if (! function_exists('generateAccessToken')) {

    function makePsr17Request($user, $password): bool|string
    {
        // Create an instance of AccessTokenController to handle the request
        $accessTokenController = app(AccessTokenController::class);

        // Create a Psr17Factory instance to generate PSR-7 compatible request
        $psr17Factory = new Psr17Factory;

        // Create a ServerRequestInterface instance with required parameters
        $serverRequest = $psr17Factory->createServerRequest(
            'POST',
            'http://127.0.0.1:8000/oauth/token'
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

            $responseContent = makePsr17Request($user, $password);

            // Decode response into an array
            $tokenData = json_decode($responseContent, true);

            // Return token data or null if an error occurred
            return isset($tokenData['error']) ? null : $tokenData;

        } catch (Throwable $e) {
            //deleteuser when tokengeneration fails
            $user->delete();

            return null; // in case of exception
        }
    }
}
