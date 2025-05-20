<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    public function index() {
        $usuarios = User::all();
        return response()->json($usuarios);
    }

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

        $empresas = new Usuario();
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

        return response()->json(['message' => 'empresa registrada exitosamente'], 201);
    }
}
