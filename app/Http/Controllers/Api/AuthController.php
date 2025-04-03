<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use function Laravel\Prompts\error;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {

        $response = ["success" => false];

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'paterno' => 'required',
            'materno' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'telefono' => 'required',
            'username' => 'required',
            'tipo_usuario_id' => 'required',
            'empresa_id' => 'required'
        ]);

        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $input = $request->all();
        $input["password"] = bcrypt($input['password']);

        $user = User::create($input);
        $user->assignRole('admin');

        $response["success"] = true;
        // $response["token"] = $user->createToken("Moran")->plainTextToken;

        return response()->json($request, 200);
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
            $user->hasRole('admin'); //error aqui undefined method hasRole

            $response['token'] = $user->createToken("caja.app")->plainTextToken; //error aqui method createToken
            $response['user'] = $user;
            $response['message'] = "Logueado correctamente";
        $response['success'] = true;
    } else {
        $response['message'] = "Credenciales incorrectas";
    }
        return response()->json($response, 200);
    }

    public function logout(){
        
        $response = ["success" => false];
        auth()->user()->tokens()->delete(); //error aqui method tokens
        $response = [
            "success" => true,
            "message" => "Secion Cerrada"
        ];
        return response()->json($response, 200);
    }

    // public function subirEmpresa(Request $request)
    // {
    //     $data = new Empresas($request->all());
    //     $data -> save();
    //     return response()->json($data,200);
    // }
}
