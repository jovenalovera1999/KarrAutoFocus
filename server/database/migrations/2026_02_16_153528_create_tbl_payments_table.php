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
        Schema::create('tbl_payments', function (Blueprint $table) {
            $table->id('payment_id');
            $table->unsignedBigInteger('car_id')->nullable();
            $table->unsignedBigInteger('buyer_id')->nullable();
            $table->unsignedBigInteger('payment_breakdown_id')->nullable();
            $table->unsignedBigInteger('payment_method_id');
            $table->date('payment_date');
            $table->double('amount')->default(0);
            $table->string('description', 255)->nullable();
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

            $table->foreign('payment_breakdown_id')
                ->references('payment_breakdown_id')
                ->on('tbl_payment_breakdowns')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('payment_method_id')
                ->references('payment_method_id')
                ->on('tbl_payment_methods')
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
        Schema::dropIfExists('tbl_payments');
        Schema::enableForeignKeyConstraints();
    }
};
