<?php

namespace App\Models;

use App\Enums\UserEventLogType;
use App\Http\Responses\ApiResponse;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

/**
 * @property int $id
 * @property int $user_id
 * @property string $email
 * @property string $token
 * @property \Illuminate\Support\Carbon|null $expiration
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereExpiration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ForgetPasswordTokens whereUserId($value)
 * @mixin \Eloquent
 */
class ForgetPasswordTokens extends Model
{
    protected $fillable = [
        'user_id',
        'email',
        'token',
        'expiration',
    ];

    protected $casts = [
        'expiration' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function updatepassword(string $password)
    {

        // check if the token has expired
        if (Carbon::parse($this->expiration)->isPast()) {
            return ApiResponse::setMessage('Password reset token has expired')->response(Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Fetch the associated user and update the password
        $user = User::findOrFail($this->user_id);
        $user->password = Hash::make($password);
        $user->save();

        // delete the token after successful update
        $this->delete();

        UserEventLog::logUserEvent(
            UserEventLogType::getDescription(UserEventLogType::PasswordChanged),
            $user->id,
            ['User Password Updated'],
        );

        return ['status' => true,
            'message' => 'Password updated Succesfully'];

    }
}
