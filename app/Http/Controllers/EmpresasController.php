<?php

namespace App\Http\Controllers;

use Psy\Util\Str;
use App\Models\Empresa;
use App\Utils\PHPMailerHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Utils\PHPLogToFile;

class EmpresasController extends Controller
{
    // funcion para obtener todas las empresas
    public function index()
    {
        $empresas = Empresa::all();
        return response()->json($empresas);
    }
    // funcion para obtener una empresa por id
    public function show($id)
    {
        $empresa = Empresa::find($id);
        if (!$empresa) {
            return response()->json(['message' => 'empresa no encontrada'], 404);
        }
        return response()->json($empresa);
    }

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

            return response()->json(['error' => 'Token inválido o empresa no encontrada'], 404);
        }
    }
}
