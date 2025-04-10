<?php

namespace App\Http\Controllers\Api\Paciente;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaPacienteController extends Controller
{
    // ponstrar todas las empresas
    public function index()
    {
        // mosntrar a todos las empresas
        $empresas = Empresa::all();
        return response()->json($empresas);
    }
}
