<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->validate([
            'username' => ['required', 'min:6', 'max:12'],
            'password' => ['required', 'min:6', 'max:15'],
        ]);

        if(!$token = Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Username or password is incorrect'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    public function refresh() {
        return $this->respondWithToken(Auth::refresh());
    }

    public function me() {
        return response()->json(Auth::user(), 200);
    }

    public function logout() {
        Auth::logout();

        return response()->json([
            'Your Account Successfully Logged Out'
        ], 200)
        ->cookie(
            'access_token', // name
            '', // value
            -1, // minutes
            '/', //
            null, // domain
            app()->environment('production'), // secure
            true, // httpOnly
            false, // raw
            'Strict' // sameSite
        );
    }

    protected function respondWithToken($token) {
        $ttl = config('jwt.ttl');

        $cookie = cookie(
            'access_token', // name
            $token, // value
            $ttl, // minutes
            '/', //
            null, // domain
            app()->environment('production'), // secure
            true, // httpOnly
            false, // raw
            'Strict' // sameSite
        );

        return response()->json([
            'expires_in' => $ttl * 60
        ], 200)
        ->cookie($cookie);
    }
}
