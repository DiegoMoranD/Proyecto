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

Route::get('/admin/{any}', function () {
    return view('welcome');
});