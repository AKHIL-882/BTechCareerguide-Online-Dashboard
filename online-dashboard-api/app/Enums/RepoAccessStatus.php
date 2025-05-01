<?php

namespace App\Enums;

/**
 * @model App\Models\UserGithubUsername
 *
 * @column status
 */
final class RepoAccessStatus extends BaseEnum
{
    const AccessPending = 0; // Description: The access request is pending approval.

    const AccessGiven = 1;     // Description: The access has been granted.

    const AccessFailed = 2; // Description: The access request has failed.

    /**
     * Get all statuses with their descriptions.
     *
     * @return array
     */
    public static function getDescription($enum): string
    {
        return match ($enum) {
            self::AccessPending => 'The access request is pending approval.',
            self::AccessGiven => 'The access has been granted.',
            self::AccessFailed => 'The access request has failed.',
            default => parent::getDescription($enum)

        };

    }
}
