<?php

namespace App\Models;

use App\Enums\CustomerEventStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CustomerEventLog extends Model
{
    protected $fillable = [
        'user_id',
        'action', 
        'status', 
        'email',
        'error_message'
    ] ;


    public static function createLog($action, $errorMessage = null) 
    {
        self::create([
            'user_id' => Auth::user()->id,
            'email' => Auth::user()->email,
            'action' => json_encode($action),
            'status' => CustomerEventStatus::Success,
            // 'error_message' => $errorMessage
        ]) ;
    }
}
