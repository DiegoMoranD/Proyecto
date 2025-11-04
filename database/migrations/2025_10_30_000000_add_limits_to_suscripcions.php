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
        Schema::table('suscripcions', function (Blueprint $table) {
            $table->integer('max_users')->default(2); // Límite de usuarios
            $table->integer('max_patients')->default(50); // Límite de pacientes
            $table->boolean('advanced_calendar')->default(false); // Calendario avanzado
            $table->boolean('custom_prescriptions')->default(false); // Recetas personalizadas
            $table->boolean('advanced_statistics')->default(false); // Estadísticas avanzadas
            $table->boolean('multiple_branches')->default(false); // Múltiples sucursales
            $table->boolean('api_access')->default(false); // Acceso a API
            $table->boolean('priority_support')->default(false); // Soporte prioritario
            $table->boolean('lab_integration')->default(false); // Integración con laboratorios
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('suscripcions', function (Blueprint $table) {
            $table->dropColumn([
                'max_users',
                'max_patients',
                'advanced_calendar',
                'custom_prescriptions',
                'advanced_statistics',
                'multiple_branches',
                'api_access',
                'priority_support',
                'lab_integration'
            ]);
        });
    }
};