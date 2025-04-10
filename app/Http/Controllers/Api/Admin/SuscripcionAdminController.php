<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Suscripcion;
use Illuminate\Http\Request;

class SuscripcionAdminController extends Controller
{
    // mostrar todas las suscripciones
    public function index()
    {
        // mosntrar a todos las suscripciones
        $suscripciones = Suscripcion::all();
        return response()->json($suscripciones);
    }

    // crear una suscripcion
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'duracion' => 'required|integer',
            'tipo' => 'required|string|max:255',
        ]);

        $suscripcion = new Suscripcion();
        $suscripcion->nombre = $request->input('nombre');
        $suscripcion->precio = $request->input('precio');
        $suscripcion->duracion = $request->input('duracion');
        $suscripcion->tipo = $request->input('tipo');

        // Guardar la suscripcion
        $suscripcion->save();

        return response()->json([
            'message' => 'Suscripción registrada exitosamente',
            'id' => $suscripcion->id // Devolver el ID de la suscripción creada
        ]);
    }
    // actualizar una suscripcion
    public function update(Request $request, $id)
    {
        $suscripcion = Suscripcion::find($id);
        if (!$suscripcion) {
            return response()->json(['message' => 'Suscripción no encontrada'], 404);
        }

        $request->validate([
            'nombre' => 'string|max:255',
            'precio' => 'numeric',
            'duracion' => 'integer',
            'tipo' => 'string|max:255',
        ]);

        $suscripcion->nombre = $request->input('nombre');
        $suscripcion->precio = $request->input('precio');
        $suscripcion->duracion = $request->input('duracion');
        $suscripcion->tipo = $request->input('tipo');

        // Guardar la suscripcion
        $suscripcion->save();

        return response()->json([
            'message' => 'Suscripción actualizada exitosamente',
            'id' => $suscripcion->id // Devolver el ID de la suscripción actualizada
        ]);
    }
    // eliminar una suscripcion
    public function destroy($id)
    {
        $suscripcion = Suscripcion::find($id);
        if (!$suscripcion) {
            return response()->json(['message' => 'Suscripción no encontrada'], 404);
        }

        $suscripcion->delete();

        return response()->json(['message' => 'Suscripción eliminada exitosamente']);
    }
}
