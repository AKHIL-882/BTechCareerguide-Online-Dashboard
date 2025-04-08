<?php

namespace App\Models;

use App\Enums\UserEventLogType;
use App\Http\Responses\ApiResponse;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

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

        UserEventLog::createLog(UserEventLogType::getDescription(UserEventLogType::PasswordChanged));

        return ['status' => true,
            'message' => 'Password updated Succesfully'];

    }
}
