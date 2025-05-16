<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;

class PacientesController extends Controller
{
    //

    public function index() {
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    }


    public function show($id)
    {
        $pacientes = Paciente::find($id);
        if (!$pacientes) {
            return response()->json(['message' => 'paciente no encontrad(o/a)'], 404);
        }
        return response()->json($pacientes);
    }
}
