<?php

use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Aquí se registran las rutas web para tu aplicación.
| Estas rutas son cargadas por el RouteServiceProvider y todas
| están dentro del grupo de middleware "web".
*/

// ----------------------------------------------
// Crear Roles (comentar/descomentar según necesidad)
// ----------------------------------------------
// $role = Role::create(['name' => 'root']);
// $role = Role::create(['name' => 'admin']);
// $role = Role::create(['name' => 'medico']);
// $role = Role::create(['name' => 'paciente']);
// $role = Role::create(['name' => 'recepcion']);

// ----------------------------------------------
// todo Ruta principal
// ----------------------------------------------
Route::get('/', function () {
    return view('welcome');
});

// ----------------------------------------------
// todo Rutas generales
// ----------------------------------------------
Route::get('/{any}', function () {
    return view('welcome');
});
Route::get('/new-password/{any}', function () {
    return view('welcome');
});
Route::get('/activar-empresa/{any}', function () {
    return view('welcome');
});

// ----------------------------------------------
// todo Rutas para el rol "admin"
// ----------------------------------------------
Route::get('/admin/{any}', function () {
    return view('welcome');
});
Route::get('/admin/update-paciente/{any}', function () {
    return view('welcome');
});
Route::get('/admin/update-usuario/{any}', function () {
    return view('welcome');
});
Route::get('/admin/update-empresa/{any}', function () {
    return view('welcome');
});

Route::get('/admin/pacientes/{any}', function () {
    return view('welcome');
});

// ----------------------------------------------
// todo Rutas para el rol "medico"
// ----------------------------------------------
Route::get('/medico/{any}', function () {
    return view('welcome');
});
Route::get('/medico/cita/{any}', function () {
    return view('welcome');
});
Route::get('/medico/cita-detalles/{any}', function () {
    return view('welcome');
});
Route::get('/medico/cita-atendida/{any}', function () {
    return view('welcome');
});
Route::get('/medico/pacientes/{any}', function () {
    return view('welcome');
});
Route::get('/medico/update-paciente/{any}', function () {
    return view('welcome');
});
Route::get('/medico/agendar-form/{any}', function () {
    return view('welcome');
});
Route::get('/medico/agendar-update/{any}', function () {
    return view('welcome');
});

// ----------------------------------------------
// todo Rutas para el rol "recepcion"
// ----------------------------------------------
Route::get('/recepcion/{any}', function () {
    return view('welcome');
});
Route::get('/recepcion/pacientes/{any}', function () {
    return view('welcome');
});

Route::get('/recepcion/agendar-update/{any}', function () {
    return view('welcome');
});

// ----------------------------------------------
// todo Rutas para el rol "paciente"
// ----------------------------------------------
Route::get('/paciente/{any}', function () {
    return view('welcome');
});

// ----------------------------------------------
// todo Rutas para el rol "root"
// ----------------------------------------------
Route::get('/root/{any}', function () {
    return view('welcome');
});
Route::get('/root/update-paciente/{any}', function () {
    return view('welcome');
});
Route::get('/root/update-usuario/{any}', function () {
    return view('welcome');
});
Route::get('/root/update-empresa/{any}', function () {
    return view('welcome');
});

Route::get('/root/pacientes/{any}', function () {
    return view('welcome');
});
