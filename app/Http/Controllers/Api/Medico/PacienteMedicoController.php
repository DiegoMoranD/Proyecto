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
            'sex' => 'string|max:20',
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
        $paciente->sex = $request->input('sex');
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
            'sex' => 'string|max:20',
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

    public function metrics()
    {
        $user = auth()->user();

        // Solo pacientes de la empresa del usuario autenticado
        $pacientesQuery = \App\Models\Paciente::where('empresa_id', $user->empresa_id);

        // Clasificación IMC
        $imcClasificaciones = [
            'Bajo' => [0, 18.4],
            'Normal' => [18.5, 24.9],
            'Sobrepeso' => [25, 29.9],
            'Obs. Leve' => [30, 34.9],
            'Obs. Media' => [35, 39.9],
            'Obs. Morbida' => [40, 100]
        ];

        $imcCounts = [];
        foreach ($imcClasificaciones as $label => [$min, $max]) {
            $imcCounts[$label] = (clone $pacientesQuery)->whereBetween('imc', [$min, $max])->count();
        }

        // Tipos de sangre
        $tiposSangre = (clone $pacientesQuery)
            ->select('tipo_sangre')
            ->groupBy('tipo_sangre')
            ->selectRaw('count(*) as total')
            ->pluck('total', 'tipo_sangre');

        // Clasificación de edades
        $now = now();
        $edades = [
            'Niños' => [0, 12],
            'Adolescentes' => [13, 17],
            'Adultos' => [18, 64],
            'Adultos Mayores' => [65, 120]
        ];
        $edadCounts = [];
        foreach ($edades as $label => [$min, $max]) {
            $edadCounts[$label] = (clone $pacientesQuery)
                ->whereRaw("TIMESTAMPDIFF(YEAR, fecha_nacimiento, ?) BETWEEN ? AND ?", [$now, $min, $max])
                ->count();
        }

        return response()->json([
            'imc' => $imcCounts,
            'tipos_sangre' => $tiposSangre,
            'edades' => $edadCounts
        ]);
    }
}
