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
            if (!Schema::hasColumn('razorpay_payments', 'project_id')) {
                $table->foreignId('project_id')
                    ->nullable()
                    ->after('user_id')
                    ->constrained()
                    ->nullOnDelete();
            }

            // Add payment method
            if (!Schema::hasColumn('razorpay_payments', 'payment_method')) {
                $table->string('payment_method')
                    ->nullable()
                    ->after('amount');
            }

            // Add meta column
            if (!Schema::hasColumn('razorpay_payments', 'meta')) {
                $table->longText('meta')
                    ->nullable()
                    ->after('status');
            }
        });
    }

    public function down(): void
    {
        Schema::table('razorpay_payments', function (Blueprint $table) {

            // Drop foreign key first
            if (Schema::hasColumn('razorpay_payments', 'project_id')) {
                $table->dropConstrainedForeignId('project_id');
            }

            // Drop columns
            if (Schema::hasColumn('razorpay_payments', 'payment_method')) {
                $table->dropColumn('payment_method');
            }

            if (Schema::hasColumn('razorpay_payments', 'meta')) {
                $table->dropColumn('meta');
            }
        });
    }
};
