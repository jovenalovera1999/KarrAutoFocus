<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_payment_details', function (Blueprint $table) {
            $table->id('payment_detail_id');
            $table->unsignedBigInteger('car_id');
            $table->unsignedBigInteger('buyer_id');
            $table->double('downpayment')->nullable()->default(0);
            $table->double('processing_fee')->nullable()->default(0);
            $table->double('service_fee')->nullable()->default(0);
            $table->double('transfer')->nullable()->default(0);
            $table->unsignedBigInteger('finance_id');
            $table->double('loan_amount')->nullable()->default(0);
            $table->unsignedBigInteger('term_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('car_id')
                ->references('car_id')
                ->on('tbl_cars')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('buyer_id')
                ->references('buyer_id')
                ->on('tbl_buyers')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('finance_id')
                ->references('finance_id')
                ->on('tbl_finances')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('term_id')
                ->references('term_id')
                ->on('tbl_terms')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_payment_details');
        Schema::enableForeignKeyConstraints();
    }
};
