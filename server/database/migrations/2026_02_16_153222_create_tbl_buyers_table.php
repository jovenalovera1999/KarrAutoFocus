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
        Schema::create('tbl_buyers', function (Blueprint $table) {
            $table->id('buyer_id');
            $table->string('buyer', 255);
            $table->string('address', 255);
            $table->double('agreed_price')->nullable()->default(0);
            $table->date('date_reserved')->nullable();
            $table->unsignedBigInteger('agent_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('agent_id')
                ->references('agent_id')
                ->on('tbl_agents')
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
        Schema::dropIfExists('tbl_buyers');
        Schema::enableForeignKeyConstraints();
    }
};
