<?php

namespace App\Http\Controllers;

use App\Models\Tipo_usuario;
use Illuminate\Http\Request;

class TiposUsuariosController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre_tipo' => 'string',
            'registro_paciente' => 'integer',
            'registro_medicamento' => 'integer',
            'agendar_cita' => 'integer',
            'eliminar_paciente' => 'integer',
            'eliminar_cita' => 'integer'
        ]);

        $tipo_usuarios = new Tipo_usuario();
        $tipo_usuarios->nombre_tipo = $request->input('nombre_tipo');
        $tipo_usuarios->registro_paciente = $request->input('registro_paciente');
        $tipo_usuarios->registro_medicamento = $request->input('registro_medicamento');
        $tipo_usuarios->agendar_cita = $request->input('agendar_cita');
        $tipo_usuarios->eliminar_paciente = $request->input('eliminar_paciente');
        $tipo_usuarios->eliminar_cita = $request->input('eliminar_cita');


        $tipo_usuarios->save();

        return response()->json(['message' => 'Tipo de usuario registrado exitosamente'], 201);
    }
}
