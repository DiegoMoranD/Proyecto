<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use function Laravel\Prompts\error;
use App\Utils\PHPLogToFile;

class AuthController extends Controller
{
    // index function
    public function index()
    {
        return response()->json(['message' => 'API funcionando']);
    }
    // show function
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'usuario no encontrado'], 404);
        }
        return response()->json($user);
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

    public function login(Request $request)
    {
        $response = ["success" => false];

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        if (auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = auth()->user();

            // Verificar si el usuario tiene una empresa asociada
            if (!$user->empresa) {
                $response['message'] = "No se encontró una empresa asociada al usuario.";
                return response()->json($response, 403); // Código de estado 403: Prohibido
            }

            // Verificar si la cuenta de la empresa está validada
            if ($user->empresa->cuenta_valida === 1) {
                return response()->json(['message' => "Valide su cuenta desde el correo electrónico."], 403);
            }

            // Verificar el rol del usuario
            if ($user->hasRole('admin')) {
                $response['role'] = 'admin';
            } elseif ($user->hasRole('medico')) {
                $response['role'] = 'medico';
            } elseif ($user->hasRole('paciente')) {
                $response['role'] = 'paciente';
            } elseif ($user->hasRole('recepcion')) {
                $response['role'] = 'recepcion';
            }

            $response['token'] = $user->createToken("caja.app")->plainTextToken;
            $response['user'] = $user;
            $response['message'] = "Logueado correctamente";
            $response['success'] = true;
        } else {
            $response['message'] = "Credenciales incorrectas";
        }

        return response()->json($response, 200);
    }

    public function logout()
    {

        $response = ["success" => false];
        auth()->user()->tokens()->delete(); //error aqui method tokens
        $response = [
            "success" => true,
            "message" => "Secion Cerrada"
        ];
        return response()->json($response, 200);
    }

    public function checkEmail(Request $request)
    {
        $emailExists = User::where('email', $request->email)->exists();

        return response()->json(['exists' => $emailExists]);
    }

    // public function subirEmpresa(Request $request)
    // {
    //     $data = new Empresas($request->all());
    //     $data -> save();
    //     return response()->json($data,200);
    // }
}
