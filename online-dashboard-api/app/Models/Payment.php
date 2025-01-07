<?php

namespace App\Models;

use App\Enums\CustomerEventLogType;
use App\Http\Resources\PaymentResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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

        CustomerEventLog::createLog(CustomerEventLogType::getDescription(CustomerEventLogType::PaymentScreenshotUploaded));
    }

    public static function showAllPaymentRequest(): AnonymousResourceCollection
    {
        $paymentList = self::with(['project.user'])->orderBy('created_at', 'desc')->get();

        return PaymentResource::collection($paymentList);
    }
}
