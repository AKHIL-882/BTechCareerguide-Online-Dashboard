<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GithubUsername extends Model
{
    protected $table = 'github_usernames';

    protected $fillable = [
        'github_username',
        'user_id',
        'repo_access',
        'email',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function updateOrCreateGithubUsername($attributes, $values)
    {
        self::updateOrCreate(
            [
                'user_id' => $attributes['user_id'],
            ],
            [
                'github_username' => $values['github_username'],
                'email' => $values['email'] ?? null,
                'repo_access' => $values['repo_access'] ?? null,
            ]
        );

        return true;
    }
}
