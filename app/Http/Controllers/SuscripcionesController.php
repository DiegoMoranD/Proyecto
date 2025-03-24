<?php

namespace App\Http\Controllers;

use App\Models\Suscripcion;
use Illuminate\Http\Request;

class SuscripcionesController extends Controller
{
    public function suscripcion(Request $request){
        return response()->json($request, 200);
    }

    public function store(Request $request){
        $request->validate([
            'nombre' => 'required|string',
            'precio' => 'integer',
            'descuento' => 'integer',
            'dias' => 'integer',            
        ]);
    
        $suscripcions = new Suscripcion();
        $suscripcions->nombre = $request->input('nombre');
        $suscripcions->precio = $request->input('precio');
        $suscripcions->descuento = $request->input('descuento');
        $suscripcions->dias = $request->input('dias');
    
        $suscripcions->save();
    
        return response()->json(['message' => 'Suscripcion registrada exitosamente'], 201);
    }
}
