<?php

namespace App\Http\Controllers\Api\Medico;


use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Medicamento as ModelsMedicamento;
use Illuminate\Http\Request;
use App\Utils\PHPLogToFile;

class MedicamentoMedicoController extends Controller
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

    public function storeMedicamento(Request $request)
    {
        $request->validate([
            'nombre' => 'string',
            'descripcion' => 'string',
            'categoria' => 'string',
            'presentacion' => 'string',
            'empresa_id' => 'integer',
            'stock' => 'integer',
            'receta' => 'boolean',
            'disponible' => 'boolean'
        ]);

        $medicamentos = new ModelsMedicamento();
        $medicamentos->nombre = $request->input('nombre');
        $medicamentos->descripcion = $request->input('descripcion');
        $medicamentos->categoria = $request->input('categoria');
        $medicamentos->presentacion = $request->input('presentacion');
        $medicamentos->empresa_id = $request->input('empresa_id');
        $medicamentos->stock = $request->input('stock');
        $medicamentos->receta = $request->input('receta');
        $medicamentos->disponible = $request->input('disponible');


        $medicamentos->save();

        $usuario = auth()->user();

        return response()->json([
            'message' => 'Medicamento registrado exitosamente',
            PHPLogToFile::logToFileInfo('Datos del medicamento', [
                'Medicamento' => $request->nombre,
                'Registrado por' => $usuario->email
            ])
        ], 201);
    }

    public function updateMedicamento(Request $request, $id)
    {
        $medicamento = ModelsMedicamento::find($id);
        if (!$medicamento) {
            return response()->json(['message' => 'Medicamento no encontrado'], 404);
        }

        $request->validate([
            'nombre' => 'string',
            'descripcion' => 'string',
            'categoria' => 'string',
            'presentacion' => 'string',
            'empresa_id' => 'integer',
            'stock' => 'integer',
            'receta' => 'boolean'
        ]);

        $medicamento->update($request->all());

        // return response()->json([
        //     'message' => 'Medicamento actualizado exitosamente',
        //     'id' => $medicamento->id // Devolver el ID del Medicamento actualizado
        // ]);

        $usuario = auth()->user();

        return response()->json([
            'message' => 'Medicamento actualizado exitosamente',
            PHPLogToFile::logToFileInfo('Datos del medicamento', [
                'id' => $medicamento->id,
                'Medicamento' => $request->nombre,
                'Actualizado por' => $usuario->email
            ])
        ], 201);
    }

    public function deleteMedicamento($id) {
        $medicamento = ModelsMedicamento::find($id);

        if (!$medicamento) {
            return response()->json(['message' => 'Medicamento no encontrado'], 404);
        }

        $medicamento->delete();

        // return response()->json(['Registro Borrado'], 200);
    
        $usuario = auth()->user();

        return response()->json([
            'message' => 'Medicamento eliminado exitosamente',
            PHPLogToFile::logToFileInfo('Datos del medicamento', [
                'id' => $medicamento->id,
                'Medicamento' => $medicamento->nombre,
                'Eliminado por' => $usuario->email
            ])
        ], 200);
    }

    public function indexMedicamento()
    {
        $usuario = auth()->user();
        $empresa_id = $usuario->empresa_id;

        $medicamentos = ModelsMedicamento::where('empresa_id', $empresa_id)->get();
        return response()->json($medicamentos);
    }

    public function indexMedicamentoByAdmin()
    {
        $medicamentos = ModelsMedicamento::all();
        return response()->json($medicamentos);
    }

    public function showMedicamento($id)
    {
        $medicamento = ModelsMedicamento::find($id);
        if (!$medicamento) {
            return response()->json(['message' => 'Paciente no encontrado'], 404);
        }
        return response()->json($medicamento);
    }
}
