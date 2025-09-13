<?php

namespace App\Http\Responses;

use App\Traits\Enums;
use Illuminate\Http\JsonResponse;

class ApiResponse
{
    protected array $response = [];

    protected $message;

    protected array $results = [];

    public static function setMessage(string $message): self
    {
        $instance = new self;
        $instance->message = $message;
        $instance->response['message'] = $instance->message;

        return $instance;
    }

    public static function setData($data): self
    {
        $instance = new self;
        $instance->response['data'] = $data;

        return $instance;
    }

    public function mergeResults(array $results = []): self
    {
        $this->results = array_merge($this->results, $results);
        $this->response = array_merge($this->response, $this->results);

        return $this;
    }

    public function mergeEnumsIntoResults(array $enums): self
    {
        $enumArray = [];

        foreach ($enums as $enum) {
            if ($instances = Enums::validateEnumAndGetInstances($enum)) {
                $className = class_basename($enum);
                $enumArray['enums'][$className] = array_values($instances);
            }
        }

        $this->results = array_merge_recursive($this->results, $enumArray);
        $this->response['enums'] = $enumArray['enums'];

        return $this;
    }

    public function response($statusCode): JsonResponse
    {
        return response()->json($this->response, $statusCode);
    }
}
