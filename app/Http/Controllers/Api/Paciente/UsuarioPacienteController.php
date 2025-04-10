<?php

namespace App\Http\Controllers\Api\Paciente;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsuarioPacienteController extends Controller
{
    // mostrar los datos del usuario
    public function index(Request $request)
    {
        // Obtener el usuario autenticado
        $usuario = $request->user();

        // Retornar los datos del usuario
        return response()->json($usuario);
    }
}
