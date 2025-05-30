<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Paciente;
use App\Models\User;
use App\Models\Usuario;
use App\Utils\PHPLogToFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // mostrar todos los usuarios
    public function index()
    {
        // mosntrar a todos los usuarios
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }

    public function indexPacientes(Request $request)
    {
        // mosntrar a todos los pacientes
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    }

    public function showUser($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function showEmpresa($id)
    {
        $empresa = Empresa::find($id);
        return response()->json($empresa);
    }

    public function register(Request $request)
    {

        try {
            $response = ["success" => false];

            // Validar los datos de entrada
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'paterno' => 'required',
                'materno' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'telefono' => 'required|integer',
                'username' => 'required',
                'intentos' => 'required|integer|between:0,3',
                'tipo_usuario_id' => 'required',
                'empresa_id' => 'required'
            ]);

            if ($validator->fails()) {
                $response = ["error" => $validator->errors()];
                return response()->json($response, 422);
            }

            // Verificar si el correo ya existe
            $emailExists = User::where('email', $request->email)->exists();
            if ($emailExists) {

                // return response()->json([
                //     'success' => false,
                //     'message' => 'Cuenta ya registrada'
                // ], 409); // Código de estado 409: Conflicto
                return PHPLogToFile::logToFile('Correo ya registrado', [
                    'email' => $request->email,
                ]);
            }

            // Crear el usuario
            $input = $request->all();
            $input["password"] = bcrypt($input['password']);

            $user = User::create($input);
            $user->assignRole('medico');

            $response["success"] = true;
            PHPLogToFile::logToFileInfo('Usuario registrado correctamente', [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $request->email,
            ]);

            return response()->json($response, 201); // Código de estado 201: Creado
        } catch (\Exception $e) {
            PHPLogToFile::logToFile('Error al validar token', [
                'token' => $request->email,
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);
        }
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Paciente no encontrado'], 404);
        }

        $request->validate([
            'name' => 'string|max:255',
            'paterno' => 'string|max:255',
            'materno' => 'string|max:255',
            'telefono' => 'string|max:255',
            'username' => 'string|max:255',
            'empresa_id' => 'integer'
        ]);

        $user->update($request->all());
        $usuario = auth()->user();

        return response()->json([
            'message' => 'Usuario actualizado exitosamente',
            PHPLogToFile::logToFileInfo('Datos del user actualizados', [
                'Usuarios' => $request->name,
                'Registrado por' => $usuario->email
            ])
        ]);
    }

    public function updateEmpresa(Request $request, $id)
    {
        $empresa = Empresa::find($id);

        if (!$empresa) {
            return response()->json(['message' => 'Paciente no encontrado'], 404);
        }

        $request->validate([
            'nombre' => 'string|max:255',
            'rfc' => 'string|max:255',
            'cedula' => 'string|max:255',
            'telefono' => 'string|max:255',
        ]);

        $empresa->update($request->all());
        $usuario = auth()->user();

        return response()->json([
            'message' => 'Empresa actualizado exitosamente',
            PHPLogToFile::logToFileInfo('Datos la empresa actualizados', [
                'Empresa' => $request->nombre,
                'Registrado por' => $usuario->email
            ])
        ]);
    }

    public function destroyUser($id) {}

    public function destroyPaciente($id)
{
    $paciente = Paciente::find($id);

    if (!$paciente) {
        return response()->json(['message' => 'Paciente no encontrado'], 404);
    }

    $paciente->delete();
    $usuario = auth()->user();

    PHPLogToFile::logToFileInfo('Paciente eliminado', [
        'Paciente' => $paciente->id . ' ' . $paciente->nombre,
        'Eliminado por' => $usuario->email
    ]);
    return response()->json(['Registro Borrado'], 200);
}
}
