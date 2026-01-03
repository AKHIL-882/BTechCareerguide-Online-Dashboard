<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('razorpay_payments', function (Blueprint $table) {

            // Add project_id with foreign key
            $table->foreignId('project_id')
                ->nullable()
                ->after('user_id')
                ->constrained()
                ->nullOnDelete();

            // Add payment method
            $table->string('payment_method')
                ->nullable()
                ->after('amount');

            // Add meta column
            $table->longText('meta')
                ->nullable()
                ->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('razorpay_payments', function (Blueprint $table) {

            // Drop foreign key first
            $table->dropForeign(['project_id']);

            // Drop columns
            $table->dropColumn([
                'project_id',
                'payment_method',
                'meta',
            ]);
        });
    }
};
