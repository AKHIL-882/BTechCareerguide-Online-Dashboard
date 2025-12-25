<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $github_username
 * @property string|null $email
 * @property string|null $repo_access
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereGithubUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereRepoAccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GithubUsername whereUserId($value)
 *
 * @mixin \Eloquent
 */
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
