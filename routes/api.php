<?php

use App\Http\Controllers\Api\Admin\EmpresaAdminController;
use App\Http\Controllers\Api\Admin\PacienteAdminController;
use App\Http\Controllers\Api\Admin\SuscripcionAdminController;
use App\Http\Controllers\Api\Admin\TipoUsuarioAdminController;
use App\Http\Controllers\Api\Admin\UsuarioAdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\Api\Medico\PacienteMedicoController;
use App\Http\Controllers\Api\Paciente\EmpresaPacienteController;
use App\Http\Controllers\Api\Paciente\UsuarioPacienteController;
use App\Http\Controllers\Api\Recepcion\PacienteRecepcionController;
use App\Http\Controllers\EmpresasController;
use App\Http\Controllers\SuscripcionesController;
use App\Http\Controllers\TiposUsuariosController;
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
    //

    Route::get('/auth/empresa/{token}', [EmpresasController::class, 'getEmpresaByToken']);
    Route::post('/auth/activar-empresa/{token}', [EmpresasController::class, 'activarEmpresa']);


    // ? Public Tests
    Route::post('/auth/suscripcion', [SuscripcionesController::class, 'store']);

    Route::post('/auth/empresa', [EmpresasController::class, 'store']);
    Route::get('/auth/empresa', [EmpresasController::class, 'index']);
    // Route::get('/auth/empresa/{id}', [EmpresasController::class, 'show']);

    Route::post('/test/tipo-usuario', [TiposUsuariosController::class, 'store']);


    Route::group(['middleware' => 'auth:sanctum'], function () {
        // Auth Routes
        Route::post('/auth/logout', [AuthController::class, 'logout']);


        // todo <-------------------- Rol Root y Admin -------------------->
        Route::apiResource('/admin/empresas', EmpresaAdminController::class);
        Route::apiResource('/admin/usuarios', UsuarioAdminController::class);
        Route::apiResource('/admin/paciente', PacienteAdminController::class);
        Route::apiResource('/admin/suscripcion', SuscripcionAdminController::class);
        Route::apiResource('/admin/tipousuario', TipoUsuarioAdminController::class);


        // * <-------------------- Rol Medico -------------------->
        // Route::apiResource('/medico/paciente/table', [PacienteMedicoController::class, 'index']);
        // Route::apiResource('/medico/paciente/show', [PacienteMedicoController::class, 'show']);
        // Route::apiResource('/medico/paciente/store', [PacienteMedicoController::class, 'store']);
        // Route::apiResource('/medico/paciente/update', [PacienteMedicoController::class, 'update']);


        // ? <-------------------- Rol Paciente -------------------->
        // Route::apiResource('/paciente/empresa', [EmpresaPacienteController::class, 'index']);
        // Route::apiResource('/paciente/datos', [UsuarioPacienteController::class, 'index']);
        // Route::apiResource('/paciente/datos/update', [UsuarioPacienteController::class, 'update']);


        // todo <-------------------- Rol Recepcion -------------------->
        // Route::apiResource('/recepcion/table', [PacienteRecepcionController::class, 'index']);
        // Route::apiResource('/recepcion/show', [PacienteRecepcionController::class, 'show']);
        // Route::apiResource('/recepcion/store', [PacienteRecepcionController::class, 'store']);
        // Route::apiResource('/recepcion/update', [PacienteRecepcionController::class, 'update']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
