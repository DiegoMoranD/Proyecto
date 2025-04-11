<?php

namespace App\Http\Controllers;

use Psy\Util\Str;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresasController extends Controller
{
    // funcion para obtener todas las empresas
    public function index()
    {
        $empresas = Empresa::all();
        return response()->json($empresas);
    }
    // funcion para obtener una empresa por id
    public function show($id)
    {
        $empresa = Empresa::find($id);
        if (!$empresa) {
            return response()->json(['message' => 'empresa no encontrada'], 404);
        }
        return response()->json($empresa);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'string',
            'correo' => 'required|email|unique:empresas,correo',
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
        $empresas->tocken_acceso = substr(bin2hex(random_bytes(5)), 0, 9);
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

    public function getEmpresaByToken($token)
{
    // Buscar la empresa por el token
    $empresa = Empresa::where('tocken_acceso', $token)->first();

    if (!$empresa) {
        return response()->json(['message' => 'Token inválido o empresa no encontrada'], 404);
    }

    // Retornar los datos de la empresa
    return response()->json([
        'message' => 'Empresa encontrada',
        'empresa' => [
            'nombre' => $empresa->nombre,
            'correo' => $empresa->correo,
            'telefono' => $empresa->telefono,
            'cuenta_valida' => $empresa->cuenta_valida,
        ]
    ], 200);
}

public function activarEmpresa($token)
{
    // Buscar la empresa por el token
    $empresa = Empresa::where('tocken_acceso', $token)->first();

    if (!$empresa) {
        return response()->json(['message' => 'Token inválido o empresa no encontrada'], 404);
    }

    // Cambiar el estado de cuenta_valida a 0
    $empresa->cuenta_valida = 0;
    $empresa->save();

    return response()->json(['message' => 'Cuenta activada exitosamente'], 200);
}
}
