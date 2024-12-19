<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    protected array $response = [];

    public static function message(string $message): self
    {
        $instance = new self;
        $instance->response['message'] = $message;

        return $instance;
    }

    public static function getTokens($tokenData): self
    {

        $instance = new self;
        $instance->response['token_type'] = $tokenData['token_type'];
        $instance->response['access_token'] = $tokenData['access_token'];
        $instance->response['refresh_token'] = $tokenData['refresh_token'];
        $instance->response['expires_in'] = $tokenData['expires_in'] ?? 900;

        return $instance;
    }

    public function response($statusCode): JsonResponse
    {
        return response()->json($this->response, $statusCode);
    }
}
