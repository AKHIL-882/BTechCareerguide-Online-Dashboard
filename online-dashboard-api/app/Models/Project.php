<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'company_name',
        'youtube_video_link',
        'payment_link',
        'is_admin_project',
        'project_name',
        'technical_skills',
        'project_description',
        'days_to_complete',
        'document_name',
        'project_status',
        'payment_status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
