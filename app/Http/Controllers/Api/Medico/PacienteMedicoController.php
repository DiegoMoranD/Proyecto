<?php

namespace App\Http\Controllers\Api\Medico;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use App\Models\User;
use Illuminate\Http\Request;
use App\Utils\PHPLogToFile;

class PacienteMedicoController extends Controller
{
    // index pacientes
    public function index(Request $request)
    {
        // mosntrar a todos los pacientes
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    }

    public function show($id)
    {
        $paciente = Paciente::find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Paciente no encontrad(a/o)'], 404);
        }
        return response()->json($paciente);
    }

    // store paciente
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'tipo_sangre' => 'required|string|max:3',
            'peso' => 'required|numeric',
            'altura' => 'required|numeric',
            'imc' => 'required|numeric',
            'fecha_registro' => 'required|date',
            'empresa_id' => 'required|integer'
        ]);

        $paciente = new Paciente();
        $paciente->nombre = $request->input('nombre');
        $paciente->fecha_nacimiento = $request->input('fecha_nacimiento');
        $paciente->tipo_sangre = $request->input('tipo_sangre');
        $paciente->peso = $request->input('peso');
        $paciente->altura = $request->input('altura');
        $paciente->imc = $request->input('imc');
        $paciente->fecha_registro = $request->input('fecha_registro');
        $paciente->empresa_id = $request->input('empresa_id');

        // Guardar el paciente
        $paciente->save();
        $usuario = auth()->user();

        return response()->json([
            PHPLogToFile::logToFileInfo(
                'Nuevo paciente registrado',
                [
                    'Paciente' => $request->nombre,
                    'Registrado por' => $usuario->email
                ]
            ),
            'message' => 'Paciente registrado exitosamente',
            'id' => $paciente->id // Devolver el ID del paciente creado
        ]);
    }

    // update paciente
    public function update(Request $request, $id)
    {
        $paciente = Paciente::find($id);
        $medico = User::find($id);

        if (!$paciente) {
            return response()->json(['message' => 'Paciente no encontrado'], 404);
        }

        $request->validate([
            'nombre' => 'string|max:255',
            'fecha_nacimiento' => 'date',
            'tipo_sangre' => 'string|max:3',
            'peso' => 'numeric',
            'altura' => 'numeric',
            'imc' => 'numeric',
            'fecha_registro' => 'date',
            'empresa_id' => 'integer'
        ]);

        $paciente->update($request->all());
        $usuario = auth()->user();

        return response()->json([
            'message' => 'Paciente actualizado exitosamente',
            PHPLogToFile::logToFileInfo('Datos del paciente actualizados', [
                'Paciente' => $request->nombre,
                'Registrado por' => $usuario->email
            ])
        ]);
    }
}
