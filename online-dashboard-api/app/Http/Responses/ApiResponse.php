<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ApiResponse
{
    protected array $response = [];

    public static function setMessage(string $message)   
    {
        $instance = new self;
        $instance->response['message'] = $message;

        return $instance;
    }

    public static function responseTokens($tokenData): self
    {
        $instance = new self;
        $instance->response['tokens'] = json_encode($tokenData);
        return $instance;
    }

    public function response($statusCode): JsonResponse
    {
        return response()->json($this->response, $statusCode);
    }
}
