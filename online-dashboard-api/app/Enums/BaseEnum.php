<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

abstract class BaseEnum extends Enum
{
    public function toArray(): mixed
    {
        return $this;
    }

    public function jsonSerialize(): mixed
    {
        return $this;
    }

    public static function getAllWithDescriptions(): array
    {
        return collect(static::getValues())
            ->map(fn ($value) => [
                'value' => $value,
                'key' => static::getKey(($value)),
                'description' => static::getDescription($value),
            ])->values()->toArray();
    }
}
