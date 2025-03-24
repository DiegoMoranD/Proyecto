<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SuscripcionAdminController extends Controller
{
    public function store(Request $request)
    {
        return response()->json($request, 200);
    }

}
