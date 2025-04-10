<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteAdminController extends Controller
{
    // mostar todas los pacientes
    public function index(){
        // mosntrar a todos los pacientes
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    }

    public function show(){
        
    }
    // crear un paciente
    public function store(Request $request){
        $request->validate([
            'nombre' => 'required|string|max:255',
            'fecha_nacimiento' => 'required|date',
            'tipo_sangre' => 'required|string|max:3',
            'peso' => 'required|numeric',
            'altura' => 'required|numeric',
            'imc' => 'required|numeric',
            'fecha_registro' => 'required|date',
            'empresaID' => 'required|integer'
        ]);
        $paciente = new Paciente();
        $paciente->nombre = $request->input('nombre');
        $paciente->fecha_nacimiento = $request->input('fecha_nacimiento');
        $paciente->tipo_sangre = $request->input('tipo_sangre');
        $paciente->peso = $request->input('peso');
        $paciente->altura = $request->input('altura');
        $paciente->imc = $request->input('imc');
        $paciente->fecha_registro = $request->input('fecha_registro');
        $paciente->empresaID = $request->input('empresaID');
        // Guardar el paciente
        $paciente->save();
        return response()->json([
            'message' => 'Paciente registrado exitosamente',
            'id' => $paciente->id // Devolver el ID del paciente creado
        ]);
    }
    // actualizar un paciente
    public function update(Request $request, $id)
    {
        $paciente = Paciente::find($id);
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
            'empresaID' => 'integer'
        ]);

        $paciente->update($request->all());

        return response()->json([
            'message' => 'Paciente actualizado exitosamente',
            'paciente' => $paciente
        ]);
    }

    // eliminar un paciente
    public function destroy($id){
        $empresa = Paciente::find($id);
        if (!$empresa) {
            return response()->json(['message' => 'Paciente no encontrado'], 404);
        }
        $empresa->delete();
        return response()->json(['message' => 'Paciente eliminado exitosamente']);
    }
}
