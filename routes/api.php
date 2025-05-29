<?php

use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Medico\PacienteMedicoController;
use App\Http\Controllers\EmpresasController;
use App\Http\Controllers\PacientesController;
use App\Http\Controllers\SuscripcionesController;
use App\Http\Controllers\TiposUsuariosController;
use App\Http\Controllers\UsuariosController;
use App\Models\Tipo_usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
});

Route::prefix('v1')->group(function () {
    // public routes

    // Auth Routes
    // Route::get('/auth/{slug}',[AuthController::class, 'login']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    // Route::get('/auth/{slug}',[AuthController::class, 'register']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/check-email', [AuthController::class, 'checkEmail']);
    Route::post('/auth/recuperar', [AuthController::class, 'RecuperarCuenta']);

    // todo <---------- Auth Routes para empresas ---------->
    Route::post('/auth/generar-token-recuperacion', [EmpresasController::class, 'generarTokenRecuperacion']);
    Route::post('/auth/recuperar-token', [EmpresasController::class, 'refreshToken']);
    Route::get('/auth/validar-token-recuperacion/{token}', [EmpresasController::class, 'validarTokenRecuperacion']);
    Route::post('/auth/actualizar-password', [EmpresasController::class, 'updatePassword']);
    Route::get('/auth/empresa/{token}', [EmpresasController::class, 'getEmpresaByToken']);
    Route::post('/auth/activar-empresa/{token}', [EmpresasController::class, 'activarEmpresa']);


    // ? Public Tests
    Route::post('/auth/suscripcion', [SuscripcionesController::class, 'store']);

    Route::post('/auth/empresa', [EmpresasController::class, 'store']);
    Route::get('/auth/empresa', [EmpresasController::class, 'index']);
    Route::get('/auth/paciente', [PacientesController::class, 'index']);

    Route::get('/auth/usuario', [UsuariosController::class, 'index']);
    Route::get('/auth/usuario-name/{id}', [UsuariosController::class, 'show']);
    // Route::get('/auth/empresa/{id}', [EmpresasController::class, 'show']);

    Route::post('/test/tipo-usuario', [TiposUsuariosController::class, 'store']);
    Route::get('/auth/tipo-usuario', [TiposUsuariosController::class, 'index']);


    Route::group(['middleware' => 'auth:sanctum'], function () {
        // Auth Routes
        Route::post('/auth/logout', [AuthController::class, 'logout']);


        // todo <-------------------- Rol Root y Admin -------------------->
        Route::post('/admin/registrar-usuario', [AdminController::class, 'register']);
        Route::put('/admin/update-empresa/{id}', [AdminController::class, 'updateEmpresa']);
        Route::get('/admin/update-empresa/{id}', [AdminController::class, 'showEmpresa']);
        Route::put('/admin/update-usuario/{id}', [AdminController::class, 'updateUser']);
        Route::get('/admin/update-usuario/{id}', [AdminController::class, 'showUser']);
        Route::delete('/admin/delete-paciente/{id}', [AdminController::class, 'destroyPaciente']);

        // * <-------------------- Rol Medico -------------------->
        Route::post('/medico/registrar-paciente', [PacienteMedicoController::class, 'store']);
        Route::put('/medico/update-paciente/{id}', [PacienteMedicoController::class, 'update']);
        Route::get('/medico/update-paciente/{id}', [PacienteMedicoController::class, 'show']);


        // ? <-------------------- Rol Paciente -------------------->


        // todo <-------------------- Rol Recepcion -------------------->
        

    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
