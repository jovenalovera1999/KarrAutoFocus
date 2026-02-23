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
            $table->unsignedBigInteger('buyer_id');
            $table->timestamps();

            $table->foreign('buyer_id')
                ->references('buyer_id')
                ->on('tbl_buyers')
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
