<?php

namespace App\Traits;

trait Enums
{
    /**
     * @return bool|array
     */
    public static function validateEnumAndGetInstances(string $path)
    {
        try {
            $instances = $path::getInstances();
        } catch (\Throwable $e) {
            report($e);

            return false;
        }

        return $instances;
    }

    /**
     * @return string
     */
    public static function getClassName($path)
    {
        $pattern = '/(.*)\\\\([A-Za-z]+)/';

        return preg_replace($pattern, '$2', $path);
    }
}
