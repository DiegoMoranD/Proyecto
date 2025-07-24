<?php

use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Medico\MedicamentoMedicoController;
use App\Http\Controllers\Api\Medico\PacienteMedicoController;
use App\Http\Controllers\Api\Root\RootController;
use App\Http\Controllers\PacientesController;
use App\Http\Controllers\SuscripcionesController;
use App\Http\Controllers\TiposUsuariosController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\EmpresasController;
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
    Route::get('/auth/suscripcion', [SuscripcionesController::class, 'index']);

    Route::post('/auth/empresa', [EmpresasController::class, 'store']);
    Route::get('/auth/empresa', [EmpresasController::class, 'index']);
    Route::get('/auth/paciente', [PacientesController::class, 'index']);

    Route::get('/auth/usuario', [UsuariosController::class, 'index']);
    Route::get('/auth/usuario-name/{id}', [UsuariosController::class, 'show']);
    // Route::get('/auth/empresa/{id}', [EmpresasController::class, 'show']);}
    Route::post('/test/agendar-form', [PacienteMedicoController::class, 'storeAgenda']);


    Route::post('/test/tipo-usuario', [TiposUsuariosController::class, 'store']);
    Route::get('/auth/tipo-usuario', [TiposUsuariosController::class, 'index']);

    // Route::post('/test/medicamento', [MedicamentoMedicoController::class, 'storeMedicamento']);


    Route::group(['middleware' => 'auth:sanctum'], function () {
        // Auth Routes
        Route::post('/auth/logout', [AuthController::class, 'logout']);


        // todo <-------------------- Rol Root y Admin -------------------->
        Route::get('/admin/pacientes', [AdminController::class, 'indexPacientes']);
        Route::post('/admin/registrar-usuario', [AdminController::class, 'register']);
        Route::put('/admin/update-empresa/{id}', [AdminController::class, 'updateEmpresa']);
        Route::get('/admin/update-empresa/{id}', [AdminController::class, 'showEmpresa']);
        Route::put('/admin/update-usuario/{id}', [AdminController::class, 'updateUser']);
        Route::get('/admin/update-usuario/{id}', [AdminController::class, 'showUser']);
        Route::delete('/admin/delete-paciente/{id}', [AdminController::class, 'destroyPaciente']);

        // ! Root
        Route::post('/root/crear-empresa', [RootController::class, 'storeEmpresa']);
        Route::post('/root/crear-usuario', [RootController::class, 'storeUsuario']);
        Route::delete('/root/delete-empresa/{id}', [RootController::class, 'destroyEmpresa']);
        Route::delete('/root/delete-usuario/{id}', [RootController::class, 'destroyUsuario']);
        Route::get('/root/users-by-role', [RootController::class, 'usersByRole']);

        // * <-------------------- Rol Medico -------------------->
        Route::post('/medico/registrar-paciente', [PacienteMedicoController::class, 'store']);
        Route::put('/medico/update-paciente/{id}', [PacienteMedicoController::class, 'update']);
        Route::get('/medico/update-paciente/{id}', [PacienteMedicoController::class, 'show']);
        Route::get('/medico/paciente-metrics', [PacienteMedicoController::class, 'metrics']);
        Route::get('/medico/paciente/{id}', [PacienteMedicoController::class, 'show']);

        // * Medicamentos
        Route::get('/admin/medicamento/catalogo', [MedicamentoMedicoController::class, 'indexMedicamentoByAdmin']);
        Route::post('/medicamento/regristro', [MedicamentoMedicoController::class, 'storeMedicamento']);
        Route::get('/medicamento/catalogo', [MedicamentoMedicoController::class, 'indexMedicamento']);
        Route::put('/medicamento/update/{id}', [MedicamentoMedicoController::class, 'updateMedicamento']);
        Route::delete('/medicamento/delete/{id}', [MedicamentoMedicoController::class, 'deleteMedicamento']);
        Route::get('/medicamento/ver/{id}', [MedicamentoMedicoController::class, 'showMedicamento']);

        //* Citas
        Route::get('/medico/citas-paciente/{paciente_id}', [PacienteMedicoController::class, 'indexAgendaPaciente']);
        Route::get('/medico/citas/{id}', [PacienteMedicoController::class, 'indexAgendaShow']);
        Route::get('/medico/agenda', [PacienteMedicoController::class, 'indexAgenda']);
        Route::post('/medico/agendar-form', [PacienteMedicoController::class, 'storeAgenda']);
        Route::get('/medico/cita/{id}', [PacienteMedicoController::class, 'show']); 
        Route::post('/medico/cita-detalles/{id}', [PacienteMedicoController::class, 'CitaDetalles']);
        Route::get('/medico/cita-atendida/{id}', [PacienteMedicoController::class, 'citaAtendidaShow']);


        // ? <-------------------- Rol Paciente -------------------->


        // todo <-------------------- Rol Recepcion -------------------->


        Route::get('/auth/dashboard-metrics', [AuthController::class, 'dashboardMetrics']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
