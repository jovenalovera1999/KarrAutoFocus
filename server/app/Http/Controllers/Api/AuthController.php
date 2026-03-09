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

        if(!Auth::guard('web')->attempt($credentials)) {
            return response()->json([
                'message' => 'Username or password is incorrect'
            ], 401);
        }

        $request->session()->regenerate();
        $user = Auth::guard('web')->user()->load(['branch', 'role']);

        return response()->json([
            'user' => $user,
        ], 200);
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Your Account Successfully Logged Out'
        ], 200);
    }
}
