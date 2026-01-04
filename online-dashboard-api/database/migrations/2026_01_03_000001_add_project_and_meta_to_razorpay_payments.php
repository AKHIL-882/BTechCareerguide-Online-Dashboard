<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('razorpay_payments', function (Blueprint $table) {

            // Add project_id with foreign key
            if (!$this->columnExists('razorpay_payments', 'project_id')) {
                $table->foreignId('project_id')
                    ->nullable()
                    ->after('user_id')
                    ->constrained()
                    ->nullOnDelete();
            }

            // Add payment method
            if (!$this->columnExists('razorpay_payments', 'payment_method')) {
                $table->string('payment_method')
                    ->nullable()
                    ->after('amount');
            }

            // Add meta column
            if (!$this->columnExists('razorpay_payments', 'meta')) {
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
            if ($this->columnExists('razorpay_payments', 'project_id')) {
                $table->dropConstrainedForeignId('project_id');
            }

            // Drop columns
            if ($this->columnExists('razorpay_payments', 'payment_method')) {
                $table->dropColumn('payment_method');
            }

            if ($this->columnExists('razorpay_payments', 'meta')) {
                $table->dropColumn('meta');
            }
        });
    }

    private function columnExists(string $table, string $column): bool
    {
        // Older MySQL/MariaDB releases don't handle bindings with SHOW COLUMNS reliably
        $column = str_replace('`', '``', $column);
        return !empty(DB::select("SHOW COLUMNS FROM `{$table}` LIKE '{$column}'"));
    }
};
