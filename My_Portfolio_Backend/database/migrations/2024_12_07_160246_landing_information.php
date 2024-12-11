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
       Schema::create('Landing_Information',function(Blueprint $table){
        $table->id()->autoIncrement()->primary();
        $table->text('ProfilePhoto');
        $table->string('Icon1');
        $table->string('Icon2');
        $table->string('Icon3');
        $table->string('Icon4');
        $table->string('IconLink1');
        $table->string('IconLink2');
        $table->string('IconLink3');
        $table->string('IconLink4');
        $table->text('Description');
       });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('Landing_Information');
    }
};
