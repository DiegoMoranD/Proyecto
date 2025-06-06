<?php

namespace App\Http\Controllers\Api\Root;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\Tipo_usuario;
use App\Models\User;
use App\Models\Usuario;
use App\Utils\PHPLogToFile;
use App\Utils\PHPMailerHelper;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RootController extends Controller
{
    public function storeEmpresa(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'string',
                'correo' => 'required|email|unique:empresas,correo',
                'telefono' => 'integer',
                'rfc' => 'string',
                'tocken_acceso' => 'string',
                'cuenta_valida' => 'integer',
                'cedula' => 'string',
                'suscripcion_id' => 'required|integer',
                'fecha_registro' => 'date',
                'fecha_vencimiento' => 'date',
                'tocken_acceso_expiracion' => 'date',
                'fecha_compra' => 'date'
            ]);

            $empresas = new Empresa();
            $empresas->nombre = $request->input('nombre');
            $empresas->correo = $request->input('correo');
            $empresas->telefono = $request->input('telefono');
            $empresas->rfc = $request->input('rfc');
            $empresas->tocken_acceso = substr(bin2hex(random_bytes(5)), 0, 9);
            $empresas->cuenta_valida = $request->input('cuenta_valida');
            $empresas->cedula = $request->input('cedula');
            $empresas->suscripcion_id = $request->input('suscripcion_id');
            $empresas->fecha_registro = $request->input('fecha_registro');
            $empresas->fecha_vencimiento = $request->input('fecha_vencimiento');
            $empresas->fecha_compra = $request->input('fecha_compra');

            $empresas->save();

            // Enviar correo de validación
            $token = $empresas->tocken_acceso;
            $validationUrl = "http://127.0.0.1:8000/activar-empresa/{$token}";
            $subject = "Activación de cuenta - TecuaniSoft";
            $body = "
        <h1>Bienvenido a TecuaniSoft</h1>
        <p>Gracias por registrarte. Por favor, valida tu cuenta haciendo clic en el siguiente enlace:</p>
        <a href='{$validationUrl}'>Activar Cuenta</a>
        <p>Si no solicitaste este registro, ignora este mensaje.</p>
    ";
            PHPLogToFile::logToFileInfo('Correo de validacion enviado', ['correo' => $empresas->correo]);

            $emailStatus = PHPMailerHelper::sendEmail($empresas->correo, $subject, $body);

            if ($emailStatus !== true) {
                return response()->json(['message' => $emailStatus], 500);
            }


            return response()->json([
                'message' => 'Empresa registrada exitosamente. Se ha enviado un correo de validación.',
                'id' => $empresas->id
            ], 201);
        } catch (\Exception $e) {
            // Registrar el error en el archivo de logs
            PHPLogToFile::logToFile('Error al registrar la emopresa', [
                // 'token' => $token,
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'Empresa no registrada'], 404);
        }
    }

    public function storeUsuario(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'paterno' => 'required|string',
                'materno' => 'required|string',
                'username' => 'required|string|unique:users,username',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'tipo_usuario_id' => 'required|integer|exists:tipo_usuarios,id',
                'telefono' => 'required|string',
                'empresa_id' => 'required|integer|exists:empresas,id',
            ]);

            $usuario = new User();
            $usuario->name = $request->input('name');
            $usuario->paterno = $request->input('paterno');
            $usuario->materno = $request->input('materno');
            $usuario->username = $request->input('username');
            $usuario->email = $request->input('email');
            $usuario->password = bcrypt($request->input('password'));
            $usuario->tipo_usuario_id = $request->input('tipo_usuario_id');
            $usuario->telefono = $request->input('telefono');
            $usuario->empresa_id = $request->input('empresa_id');
            $usuario->save();

            // Buscar el nombre del tipo de usuario
            $tipoUsuario = Tipo_usuario::find($request->input('tipo_usuario_id'));
            if ($tipoUsuario) {
                // Asignar el rol con el mismo nombre
                $usuario->assignRole($tipoUsuario->nombre_tipo);
            }

            return response()->json(['message' => 'Usuario registrado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroyEmpresa($id)
    {
        $empresa = Empresa::find($id);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrado'], 404);
        }

        $empresa->delete();
        $usuario = auth()->user();

        PHPLogToFile::logToFileInfo('Empresa eliminada', [
            'Empresa' => $empresa->id . ' ' . $empresa->nombre,
            'Eliminado por' => $usuario->email
        ]);
        return response()->json(['Registro Borrado'], 200);
    }

    public function destroyUsuario($id)
    {
        $usuario = User::find($id);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $usuario->delete();
        $usuario = auth()->user();

        PHPLogToFile::logToFileInfo('Usuario eliminado', [
            'Usuario' => $usuario->id . ' ' . $usuario->nombre,
            'Eliminado por' => $usuario->email
        ]);
        return response()->json(['Registro Borrado'], 200);
    }
}
