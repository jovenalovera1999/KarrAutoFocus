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
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('first_name', 55);
            $table->string('middle_name', 55)->nullable();
            $table->string('last_name', 55);
            $table->string('suffix_name', 55)->nullable();
            $table->date('birth_date');
            $table->string('contact_number', 55);
            $table->string('email', 55)->nullable();
            $table->string('username', 55)->unique();
            $table->string('password', 255);
            $table->unsignedBigInteger('role_id');
            $table->unsignedBigInteger('branch_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('role_id')
                ->references('role_id')
                ->on('tbl_roles')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('branch_id')
                ->references('branch_id')
                ->on('tbl_branches')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::enableForeignKeyConstraints();
        Schema::dropIfExists('tbl_users');
        Schema::disableForeignKeyConstraints();
    }
};
