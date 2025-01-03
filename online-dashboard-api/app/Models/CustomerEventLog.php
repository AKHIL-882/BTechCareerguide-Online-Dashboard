<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CustomerEventLog extends Model
{
    protected $fillable = [
        'user_id',
        'action', 
        'status', 
        'email'
    ] ;


    public static function createLog($action, $user=null) 
    {
        self::create([
            'user_id' => Auth::user()?->id ?? $user->id,
            'email' => Auth::user()?->id ?? $user->email,
            'action' => json_encode($action),
            'status' => Status::Success
        ]) ;
    }
}
