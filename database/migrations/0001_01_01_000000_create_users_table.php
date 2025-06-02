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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('paterno');
            $table->string('materno');
            $table->string('email');
            $table->string('telefono');
            $table->string('username');
            $table->string('password');            
            $table->integer('intentos')->default(0);
            $table->timestamp('tocken_acceso_expiracion')->nullable();
            $table->timestamp('last_attempt_at')->nullable();
            $table->unsignedBigInteger('tipo_usuario_id'); 
            $table->foreign('tipo_usuario_id')->references('id')->on('tipo_usuarios')->onDelete('cascade');
            $table->unsignedBigInteger('empresa_id');
            $table->foreign('empresa_id')->references('id')->on('empresas')->onDelete('cascade'); 
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
