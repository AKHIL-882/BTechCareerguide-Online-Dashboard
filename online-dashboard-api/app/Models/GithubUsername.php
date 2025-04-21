<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GithubUsername extends Model
{
    protected $table = 'github_usernames' ;
    protected $fillable = [
        'github_username',
        'user_id',
        'repo_access',
    ] ;


    public function user() : BelongsTo 
    {
        return $this->belongsTo(User::class) ;
    }
}
