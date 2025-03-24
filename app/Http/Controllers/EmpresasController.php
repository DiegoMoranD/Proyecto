<?php

namespace App\Http\Controllers;

use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresasController extends Controller
{
    //

    public function store(Request $request){
        $request->validate([
            'nombre' => 'required|string',
            'precio' => 'integer',
            'descuento' => 'integer',
            'dias' => 'integer',            
        ]);
    
        $suscripcions = new Empresa();
        $suscripcions->nombre = $request->input('nombre');
        $suscripcions->precio = $request->input('precio');
        $suscripcions->descuento = $request->input('descuento');
        $suscripcions->dias = $request->input('dias');
    
        $suscripcions->save();
    
        return response()->json(['message' => 'Suscripcion registrada exitosamente'], 201);
    }
}
