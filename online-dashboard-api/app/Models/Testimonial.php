<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Throwable;

class Testimonial extends Model
{
    use HasFactory;

    protected $table = 'testimonials';

    protected $fillable = [
        'user_id',
        'feedback',
        'job_role',
        'company',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getLatestTestimonials(): EloquentCollection
    {
        try {
            if (! Schema::hasTable('testimonials')) {
                return new EloquentCollection;
            }

            return self::latest()->take(3)->get();
        } catch (Throwable $e) {
            return new EloquentCollection;
        }
    }
}
