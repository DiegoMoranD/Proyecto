<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresasController extends Controller
{
    // // funcion para obtener todas las empresas
    // public function index()
    // {
    //     $empresas = Empresa::all();
    //     return response()->json($empresas);
    // }
    // // funcion para obtener una empresa por id
    // public function show($id)
    // {
    //     $empresa = Empresa::find($id);
    //     if (!$empresa) {
    //         return response()->json(['message' => 'empresa no encontrada'], 404);
    //     }
    //     return response()->json($empresa);
    // }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'string',
            'correo' => 'string',
            'telefono' => 'integer',
            'rfc' => 'string',
            'tocken_acceso' => 'string',
            'cuenta_valida' => 'integer',
            'cedula' => 'string',
            'suscripcion_id' => 'required|integer',
            'fecha_registro' => 'date',
            'fecha_vencimiento' => 'date',
            'fecha_compra' => 'date'
        ]);

        $empresas = new Empresa();
        $empresas->nombre = $request->input('nombre');
        $empresas->correo = $request->input('correo');
        $empresas->telefono = $request->input('telefono');
        $empresas->rfc = $request->input('rfc');
        $empresas->tocken_acceso = $request->input('tocken_acceso');
        $empresas->cuenta_valida = $request->input('cuenta_valida');
        $empresas->cedula = $request->input('cedula');
        $empresas->suscripcion_id = $request->input('suscripcion_id');
        $empresas->fecha_registro = $request->input('fecha_registro');
        $empresas->fecha_vencimiento = $request->input('fecha_vencimiento');
        $empresas->fecha_compra = $request->input('fecha_compra');

        $empresas->save();

        return response()->json([
            'message' => 'Empresa registrada exitosamente',
            'id' => $empresas->id // Devolver el ID de la empresa creada
        ], 201);
    }
}
