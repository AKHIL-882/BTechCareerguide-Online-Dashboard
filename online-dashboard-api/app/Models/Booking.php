<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'bookings';

    protected $fillable = ['date', 'time', 'title', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getUserEmailByBookingId($bookingId): ?string
    {
        return self::where('id', $bookingId)->with('user')->first()?->user?->email;
    }

    public function getUser()
    {
        return $this->user; 
    }

}
