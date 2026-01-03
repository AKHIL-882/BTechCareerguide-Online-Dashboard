<?php

namespace App\Models;

use App\Enums\RepoAccessStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $project_id
 * @property int $user_id
 * @property int|null $admin_id
 * @property string|null $razorpay_payment_id
 * @property string|null $razorpay_order_id
 * @property string|null $github_username
 * @property string|null $github_repo
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $granted_at
 * @property string|null $notes
 */
class ProjectAccess extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'user_id',
        'admin_id',
        'razorpay_payment_id',
        'razorpay_order_id',
        'github_username',
        'github_repo',
        'status',
        'granted_at',
        'notes',
    ];

    protected $casts = [
        'granted_at' => 'datetime',
        'status' => RepoAccessStatus::class,
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
