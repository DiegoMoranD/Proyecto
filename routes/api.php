<?php
use App\Http\Controllers\Api\Admin\EmpresaAdminController;
use App\Http\Controllers\Api\Admin\PacienteAdminController;
use App\Http\Controllers\Api\Admin\SuscripcionAdminController;
use App\Http\Controllers\Api\Admin\TipoUsuarioAdminController;
use App\Http\Controllers\Api\Admin\UsuarioAdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FrontController;
use App\Http\Controllers\SuscripcionesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
});

Route::prefix('v1')->group(function () {
    // public routes

    // Auth Routes
    // Route::get('/auth/{slug}',[AuthController::class, 'login']);
    // Route::post('/auth/{slug}',[AuthController::class, 'login']);
    // Route::get('/auth/{slug}',[AuthController::class, 'register']);
    Route::post('/auth/register',[AuthController::class, 'register']);

    Route::post('/test/suscripcion', [SuscripcionesController::class, 'store']);


    Route::group(['middleware' => 'auth:sanctum'], function() {
        // Auth Routes
        Route::get('/auth/{slug}',[AuthController::class, 'logout']);

        // Rol Root y Admin
        Route::apiResource('/admin/empresas', EmpresaAdminController::class);
        Route::apiResource('/admin/usuarios', UsuarioAdminController::class);
        Route::apiResource('/admin/paciente', PacienteAdminController::class);
        Route::apiResource('/admin/suscripcion', SuscripcionAdminController::class);
        Route::apiResource('/admin/tipousuario', TipoUsuarioAdminController::class);

        // Rol Medico
        

        // Rol Paciente

        // Rol Recepcion

    });

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
