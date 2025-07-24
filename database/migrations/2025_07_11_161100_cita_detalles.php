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
        Schema::create('cita_detalles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cita_id');
            $table->foreign('cita_id')->references('id')->on('citas')->onDelete('cascade');
            $table->string("peso");
            $table->string("altura");
            $table->string("imc");
            $table->string("sintomas");
            $table->string("alergias");
            $table->string("diagnostico");
            $table->string("recomendaciones");
            $table->string("atendido_por");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cita_detalles');
        //
    }
};
