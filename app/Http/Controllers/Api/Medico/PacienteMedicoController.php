<?php

namespace App\Http\Controllers\Api\Medico;

use App\Http\Controllers\Controller;
use App\Models\Cita;
use App\Models\Cita_detalles;
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

    public function storeAgenda(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required|integer',
            'motivo' => 'required|string|max:250',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
            'atendido_por' => 'string',
            'estado' => 'string',
            'empresa_id' => 'integer',
        ]);

        $cita = new Cita();
        $cita->paciente_id = $request->input('paciente_id');
        $cita->motivo = $request->input('motivo');
        $cita->fecha = $request->input('fecha');
        $cita->hora = $request->input('hora');
        $cita->atendido_por = $request->input('atendido_por');
        $cita->estado = $request->input('estado');
        $cita->empresa_id = $request->input('empresa_id');

        $usuario = auth()->user();

        $cita->atendido_por = $usuario->name;
        $cita->empresa_id = $usuario->empresa_id;
        $cita->estado = 'registrado';

        $cita->save();

        return response()->json([
            'message' => 'Cita registrada correctamente',
            PHPLogToFile::logToFileInfo('Cita registrada', [
                'Paciente' => $cita->paciente_id,
                'Registrado por' => $usuario->email
            ]),
            'id' => $cita->id
        ], 201);
    }

    public function indexAgenda()
    {
        $usuario = auth()->user();
        $empresa_id = $usuario->empresa_id; // Asegúrate de que el usuario tenga este campo

        $citas = Cita::where('empresa_id', $empresa_id)->get();
        return response()->json($citas);
    }

    public function indexAgendaShow($id)
    {
        $cita = Cita::find($id);
        if (!$cita) {
            return response()->json(['message' => 'cita no encontrada'], 404);
        }
        return response()->json($cita);
    }

    public function CitaDetalles(Request $request, $id)
    {
        $request->validate([
            'cita_id' => 'integer',
            'peso' => 'required|numeric',
            'altura' => 'required|numeric',
            'imc' => 'numeric',
            'sintomas' => 'required|string|max:250',
            'alergias' => 'required|string|max:250',
            'diagnostico' => 'required|string|max:250',
            'atendido_por' => 'string|max:250',
            'recomendaciones' => 'required|string|max:250',
        ]);

        $cita = Cita::find($id);
        if (!$cita) {
            return response()->json(['message' => 'Cita no encontrada'], 404);
        }

        // Crear detalles de la cita
        $detalles = new Cita_detalles();
        $detalles->cita_id = $cita->id;
        $detalles->peso = $request->input('peso');
        $detalles->altura = $request->input('altura');
        $detalles->imc = $request->input('imc');
        $detalles->sintomas = $request->input('sintomas');
        $detalles->alergias = $request->input('alergias');
        $detalles->diagnostico = $request->input('diagnostico');
        $detalles->recomendaciones = $request->input('recomendaciones');
        $detalles->atendido_por = $request->input('atendido_por');
        $usuario = auth()->user();
        $detalles->atendido_por = $usuario->name . ' ' . $usuario->paterno . ' ' . $usuario->materno;
        $detalles->save();

        // Cambiar estado de la cita
        $cita->estado = 'atendido';
        $cita->save();

        return response()->json([
            'message' => 'Detalles de cita guardados y estado actualizado',
            PHPLogToFile::logToFileInfo('Cita atendida registrada', [
                'Cita' => $detalles->cita_id,
                'Atendida por' => $usuario->email
            ]),
        ]);
    }

    public function updateCita(Request $request, $id)
    {
        // Actualizar cita (reeprogramar dia y hora de la cita)
        $request->validate([
            'motivo' => 'string',
            'fecha' => 'date',
            'hora' => 'date_format:H:i',
        ]);

        $cita = Cita::find($id);
        $usuario = auth()->user();
        $cita->update($request->all());

        if (!$cita) {
            return response()->json([
                'message' => 'Cita no encontrada'
            ], 404);
        }

        return response()->json([
            'message' => 'Detalles de cita estado actualizado',
            PHPLogToFile::logToFileInfo('Cita Actializada', [
                'Cita_id' => $cita->cita_id,
                'Actualizada por' => $usuario->email
            ]),
        ]);
    }

    public function cancelCita(Request $request, $id)
    {
        $request->validate([
            'estado' => 'string',
        ]);
        $cita = Cita::find($id);
        if (!$cita) {
            return response()->json(['message' => 'Cita no encontrada'], 404);
        }
        $cita->estado = 'cancelado'; // Cambia a cancelado
        $cita->update($request->all());

        return response()->json(['message' => 'Cita cancelada exitosamente']);
    }

    public function citaAtendidaShow($id)
    {
        $detalles = Cita_detalles::where('cita_id', $id)->first();
        if (!$detalles) {
            return response()->json(['message' => 'No hay detalles para esta cita'], 404);
        }
        return response()->json($detalles);
    }

    public function citasSemana()
    {
        $usuario = auth()->user();
        $empresa_id = $usuario->empresa_id;

        $hoy = now()->startOfDay();
        $finSemana = now()->addDays(6)->endOfDay();

        $citas = Cita::with('paciente')
            ->where('empresa_id', $empresa_id)
            ->whereBetween('fecha', [$hoy, $finSemana])
            ->whereIn('estado', ['registrado', 'atendido'])
            ->orderBy('fecha', 'asc')
            ->get()
            ->map(function ($cita) {
                return [
                    'id' => $cita->id,
                    'nombre_paciente' => $cita->paciente ? $cita->paciente->nombre : 'Sin nombre',
                    'estado' => $cita->estado,
                    'fecha' => $cita->fecha,
                ];
            });

        return response()->json($citas);
    }
}
