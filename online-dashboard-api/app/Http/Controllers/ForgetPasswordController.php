<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\ForgetPasswordTokens;
use App\Models\User;

class ForgetPasswordController extends Controller
{
    public function resetPassword(ResetPasswordRequest $request)
    {

        $email = $request->email;
        //find the user by email
        $user = User::where('email', $email)->firstOrFail();

        $user->initiatePasswordReset();

        return response()->json(['message' => 'Reset link sent to your email'], 200);

    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $token = $request->token;

        //Find the token record

        $forgetPasswordToken = ForgetPasswordTokens::where('token', $token)->firstOrFail();

        if (! $forgetPasswordToken) {
            return response()->json([
                'message' => 'Invalid password reset request',
            ], 422);
        }

        $result = $forgetPasswordToken->updatePassword($request->password);

        return response()->json([
            'message' => $result['message'],
        ], $result['status'] ? 200 : 422);
    }
}
