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
        Schema::create('tbl_cars', function (Blueprint $table) {
            $table->id('car_id');
            $table->date('encode_date');
            $table->string('year_model', 255);
            $table->unsignedBigInteger('make_id');
            $table->string('series', 255);
            $table->unsignedBigInteger('transmission_id');
            $table->unsignedBigInteger('color_id');
            $table->double('price')->default(0);
            $table->string('plate_number', 255);
            $table->unsignedBigInteger('mother_file_id');
            $table->string('mv_file_number', 255);
            $table->string('engine_number', 255);
            $table->string('chassis_number', 255);
            $table->unsignedBigInteger('engine_cc_id');
            $table->unsignedBigInteger('car_status_id');
            $table->date('original_or_cr_received')->nullable();
            $table->unsignedBigInteger('encumbered_id')->nullable();
            $table->date('rod_received')->nullable();
            $table->date('rod_paid')->nullable();
            $table->date('last_registered')->nullable();
            $table->date('confirmation_request')->nullable();
            $table->date('confirmation_received')->nullable();
            $table->date('hpg_clearance')->nullable();
            $table->unsignedBigInteger('transfer_status_id');
            $table->string('first_owner', 255)->nullable();
            $table->string('address', 255)->nullable();
            $table->unsignedBigInteger('buyer_id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('make_id')
                ->references('make_id')
                ->on('tbl_makes')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('transmission_id')
                ->references('transmission_id')
                ->on('tbl_transmissions')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('color_id')
                ->references('color_id')
                ->on('tbl_colors')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('mother_file_id')
                ->references('mother_file_id')
                ->on('tbl_mother_files')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('engine_cc_id')
                ->references('engine_cc_id')
                ->on('tbl_engine_ccs')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('car_status_id')
                ->references('car_status_id')
                ->on('tbl_car_status')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('encumbered_id')
                ->references('encumbered_id')
                ->on('tbl_encumbereds')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('transfer_status_id')
                ->references('transfer_status_id')
                ->on('tbl_transfer_status')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

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
        Schema::dropIfExists('tbl_cars');
        Schema::enableForeignKeyConstraints();
    }
};
