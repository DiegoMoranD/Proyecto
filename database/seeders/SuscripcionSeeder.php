<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SuscripcionSeeder extends Seeder
{
    public function run()
    {
        DB::table('suscripcions')->insert([
            [
                'nombre' => 'Básico',
                'precio' => 299.99,
                'descuento' => 0,
                'dias' => 30,
                'max_users' => 2,
                'max_patients' => 50,
                'advanced_calendar' => false,
                'custom_prescriptions' => false,
                'advanced_statistics' => false,
                'multiple_branches' => false,
                'api_access' => false,
                'priority_support' => false,
                'lab_integration' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre' => 'Pro',
                'precio' => 599.99,
                'descuento' => 10,
                'dias' => 30,
                'max_users' => 5,
                'max_patients' => 200,
                'advanced_calendar' => true,
                'custom_prescriptions' => true,
                'advanced_statistics' => true,
                'multiple_branches' => false,
                'api_access' => false,
                'priority_support' => false,
                'lab_integration' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre' => 'Ultra',
                'precio' => 999.99,
                'descuento' => 15,
                'dias' => 30,
                'max_users' => -1, // -1 significa ilimitado
                'max_patients' => -1,
                'advanced_calendar' => true,
                'custom_prescriptions' => true,
                'advanced_statistics' => true,
                'multiple_branches' => true,
                'api_access' => true,
                'priority_support' => true,
                'lab_integration' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}