<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaAdminController extends Controller
{
    // mostar todas las empresas
    public function index(){
        $empresas = Empresa::all();
        return response()->json($empresas);
    }

    // crear una empresa
    public function store(){
        
    }



}
