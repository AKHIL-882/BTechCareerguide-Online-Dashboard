<?php

namespace App\Models;

use App\Http\Resources\PaymentResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property string $payment_document_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Project $project
 * @property-read \App\Models\User|null $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment wherePaymentDocumentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereUserId($value)
 *
 * @mixin \Eloquent
 */
class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'project_id',
        'payment_document_name',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Project::class, 'id', 'id', 'project_id', 'user_id');
    }

    public static function createPayment($request)
    {
        $fileName = time().'-'.$request->file('file')->getClientOriginalName();
        $filePath = $request->file('file')->storeAs('userPaymentFiles', $fileName, 'public');

        self::create([
            'user_id' => $request->user_id,
            'project_id' => $request->project_id,
            'payment_document_name' => $filePath,
        ]);

        // Event logging removed; add audit logging here if payment uploads should be tracked.
    }

    public static function showAllPaymentRequest(): AnonymousResourceCollection
    {
        $paymentList = self::with(['project.user'])->orderBy('created_at', 'desc')->get();

        return PaymentResource::collection($paymentList);
    }
}
