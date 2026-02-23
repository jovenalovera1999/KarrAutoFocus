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
        Schema::create('tbl_unit_expenses', function (Blueprint $table) {
            $table->id('unit_expense_id');
            $table->unsignedBigInteger('car_id');
            $table->double('amount');
            $table->string('description', 255);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('car_id')
                ->references('car_id')
                ->on('tbl_cars')
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
        Schema::dropIfExists('tbl_unit_expenses');
        Schema::enableForeignKeyConstraints();
    }
};
