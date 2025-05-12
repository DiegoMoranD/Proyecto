<?php

namespace App\Http\Controllers;

use Psy\Util\Str;
use App\Models\Empresa;
use App\Models\User;
use App\Utils\PHPMailerHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Utils\PHPLogToFile;
use PhpParser\Node\Stmt\TryCatch;

class EmpresasController extends Controller
{
    // funcion para obtener todas las empresas
    public function index()
    {
        $empresas = Empresa::all();
        return response()->json($empresas);
    }
    // todo ________________________________________________________________________________________________________________


    // funcion para obtener una empresa por id
    public function show($id)
    {
        $empresa = Empresa::find($id);
        if (!$empresa) {
            return response()->json(['message' => 'empresa no encontrada'], 404);
        }
        return response()->json($empresa);
    }

    // todo ________________________________________________________________________________________________________________


    public function store(Request $request)
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
                'token' => $token,
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'Empresa no registrada'], 404);
        }
    }

    // todo ________________________________________________________________________________________________________________

    public function refreshToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // Buscar la empresa por correo
        $empresa = Empresa::where('correo', $request->email)->first();

        if (!$empresa) {
            return response()->json([
                PHPLogToFile::logToFile('Correo no registrado', ['correo' => $empresa->correo]),
                'success' => false,
                'message' => 'Correo no registrado',
            ], 404);
        }

        // generar un nuevo token
        $token = substr(bin2hex(random_bytes(5)), 0, 9);
        $empresa->tocken_acceso = $token;
        $empresa->save();

        // enviar el token al correo de la empresa
        $recoveryUrl = "http://127.0.0.1:8000/activar-empresa/{$token}";
        $subject = "Reenvio de token - TecuaniSoft";
        $body = "
            <h1>Generacion de nuevo token</h1>
            <p>Hemos recibido una solicitud para generarte un nuevo token. Por favor, haz clic en el siguiente enlace para continuar:</p>
            <a href='{$recoveryUrl}'>Activar token</a>
        ";

        $emailStatus = PHPMailerHelper::sendEmail($empresa->correo, $subject, $body);

        if (!$emailStatus) {
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar el correo',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Se ha enviado un nuevo token al correo de la empresa',
        ], 200);
    }

    // todo ________________________________________________________________________________________________________________

    public function getEmpresaByToken($token)
    {
        // Buscar la empresa por el token
        $empresa = Empresa::where('tocken_acceso', $token)->first();

        if (!$empresa) {
            return response()->json(['message' => 'Token inválido o empresa no encontrada'], 404);
        }

        // Retornar los datos de la empresa
        return response()->json([
            'message' => 'Empresa encontrada',
            'empresa' => [
                'nombre' => $empresa->nombre,
                'correo' => $empresa->correo,
                'telefono' => $empresa->telefono,
                'cuenta_valida' => $empresa->cuenta_valida,
            ]
        ], 200);
    }

    // todo ________________________________________________________________________________________________________________


    public function activarEmpresa($token)
    {
        try {
            PHPLogToFile::logToFileInfo('Iniciando validación del token', ['token' => $token]);

            // Validar si el token está vacío
            if (empty($token)) {
                PHPLogToFile::logToFile('Token inválido: vacío', ['token' => $token]);
                return response()->json(['message' => 'Token inválido'], 400);
            }

            // Buscar la empresa por el token
            $empresa = Empresa::where('tocken_acceso', $token)->first();

            if (!$empresa) {
                PHPLogToFile::logToFile('Token inválido: no encontrado', ['token' => $token]);
                return response()->json(['message' => 'Token inválido o empresa no encontrada'], 404);
            }

            // Cambiar el estado de cuenta_valida a 0
            $empresa->cuenta_valida = 0;
            $empresa->tocken_acceso = null;
            $empresa->save();

            PHPLogToFile::logToFileInfo('Cuenta activada exitosamente', ['empresa_id' => $empresa->id]);

            return response()->json(['message' => 'Cuenta activada exitosamente'], 200);
        } catch (\Exception $e) {
            // Registrar el error en el archivo de logs
            PHPLogToFile::logToFile('Error al validar token', [
                'token' => $token,
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString(),
            ]);
            PHPLogToFile::logToFile('Token inválido o empresa no encontrada');
            return response()->json(['error' => 'Token inválido o empresa no encontrada'], 404);
        }
    }
    // todo ________________________________________________________________________________________________________________

    public function generarTokenRecuperacion(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // Buscar la empresa por correo
        $empresa = Empresa::where('correo', $request->email)->first();

        if (!$empresa) {
            return response()->json([
                PHPLogToFile::logToFile('Correo no registrado', ['correo' => $empresa->correo]),
                'success' => false,
                'message' => 'Correo no registrado',
            ], 404);
        }

        // Generar el token
        $token = $this->generateRecoveryToken();
        $empresa->tocken_acceso = $token;
        $empresa->tocken_acceso_expiracion = now()->addHour(); // Expira en 1 hora
        $empresa->save();

        // Enviar el correo
        $recoveryUrl = "http://127.0.0.1:8000/new-password/{$token}";
        $subject = "Recuperación de cuenta - TecuaniSoft";
        $body = "
            <h1>Recuperación de cuenta</h1>
            <p>Hemos recibido una solicitud para recuperar tu cuenta. Por favor, haz clic en el siguiente enlace para continuar:</p>
            <a href='{$recoveryUrl}'>Recuperar cuenta</a>
            <p>Este enlace expirará en 1 hora.</p>
        ";

        $emailStatus = PHPMailerHelper::sendEmail($empresa->correo, $subject, $body);

        if ($emailStatus !== true) {
            return response()->json([
                PHPLogToFile::logToFile('Gmail de recuperacion enviado', ['correo' => $empresa->correo]),
                'message' => $emailStatus
            ], 404);
        }


        return response()->json([
            PHPLogToFile::logToFileInfo('Gmail de recuperacion enviado', ['correo' => $empresa->correo]),
            'success' => true,
            'message' => 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
        ], 200);
    }

    // todo ________________________________________________________________________________________________________________

    private function generateRecoveryToken()
    {
        $randomString = substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'), 0, 4);
        return 'RECU|' . $randomString;
    }
    // todo ________________________________________________________________________________________________________________

    public function validarTokenRecuperacion($token)
    {
        $empresa = Empresa::where('tocken_acceso', $token)->first();

        if (!$empresa) {
            return response()->json([
                'success' => false,
                // 'message' => 'Token inválido',
            ], 404);
        }

        if (now()->greaterThan($empresa->tocken_acceso_expiracion)) {
            return response()->json([
                'success' => false,
                'message' => 'El token ha expirado',
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => 'Token válido',
            'empresa' => [
                'correo' => $empresa->correo,
            ],
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Buscar la empresa por el token
        $empresa = Empresa::where('tocken_acceso', $request->token)->first();

        if (!$empresa) {
            return response()->json([
                'success' => false,
                'message' => 'Enlace no válido o expirado',
            ], 400);
        }

        // Verificar si el token ha expirado
        if (now()->greaterThan($empresa->tocken_acceso_expiracion)) {
            return response()->json([
                'success' => false,
                'message' => 'El token ha expirado',
            ], 400);
        }

        // Buscar al usuario asociado a la empresa
        $usuario = User::where('empresa_id', $empresa->id)->first();

        if (!$usuario) {
            return response()->json([
                'success' => false,
                'message' => 'No se encontró un usuario asociado a esta empresa',
            ], 404);
        }

        // Actualizar la contraseña del usuario
        $usuario->password = bcrypt($request->password);
        $usuario->save();

        // Invalidar el token
        $empresa->tocken_acceso = null;
        $empresa->tocken_acceso_expiracion = null;
        $empresa->save();

        $recoveryUrl = "http://127.0.0.1:8000/login";
        $subject = "Recuperación de cuenta realizada - TecuaniSoft";
        $body = "
                <h1>Recuperación de cuenta exitosa</h1>
                <p>Tu nueva contraseña ha sido actualizada correctamente, ya puedes probar yu nueva contraseña mediante este enlace:</p>
                <a href='{$recoveryUrl}'>Probar nueva contraseña</a>
            ";

        $emailStatus = PHPMailerHelper::sendEmail($empresa->correo, $subject, $body);

        return response()->json([
            'success' => true,
            'message' => 'Contraseña actualizada exitosamente',
        ], 200);
    }
}
