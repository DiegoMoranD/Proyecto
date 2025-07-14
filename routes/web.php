<?php

use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Role;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// $role = Role::create(['name' => 'root']);
// $role = Role::create(['name' => 'admin']);
// $role = Role::create(['name' => 'medico']);
// $role = Role::create(['name' => 'paciente']);
// $role = Role::create(['name' => 'recepcion']);

Route::get('/', function () {
    return view('welcome');
});

Route::get('/{any}', function () {
    return view('welcome');
});

Route::get('/new-password/{any}', function () {
    return view('welcome');
});

Route::get('/activar-empresa/{any}', function () {
    return view('welcome');
});

Route::get('/admin/{any}', function () {
    return view('welcome');
});

Route::get('/medico/{any}', function () {
    return view('welcome');
});

Route::get('/medico/pacientes/{any}', function () {
    return view('welcome');
});

Route::get('/medico/update-paciente/{any}', function () {
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

Route::get('/root/update-paciente/{any}', function () {
    return view('welcome');
});

Route::get('/root/update-usuario/{any}', function () {
    return view('welcome');
});

Route::get('/root/update-empresa/{any}', function () {
    return view('welcome');
});



Route::get('/recepcion/{any}', function () {
    return view('welcome');
});

Route::get('/paciente/{any}', function () {
    return view('welcome');
});

Route::get('/root/{any}', function () {
    return view('welcome');
});
