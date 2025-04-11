<?php

namespace App\Http\Controllers\Medico;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmpresaMedicoController extends Controller
{
    // Mostrar Datos de la empresa del usuario medico
    public function index(Request $request)
    {
        // Obtener el usuario autenticado
        $usuario = $request->user();

        // Retornar los datos del usuario
        return response()->json($usuario);
    }

    // actualizar los datos de la empresa del usuario medico
    public function update(Request $request)
    {
        // Obtener el usuario autenticado
        $usuario = $request->user();

        // Actualizar los datos del usuario
        $usuario->update($request->all());

        // Retornar los datos actualizados del usuario
        return response()->json($usuario);
    }
}
