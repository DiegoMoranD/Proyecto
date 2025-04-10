<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioAdminController extends Controller
{
    // mostrar todos los usuarios
    public function index()
    {
        // mosntrar a todos los usuarios
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }
}
