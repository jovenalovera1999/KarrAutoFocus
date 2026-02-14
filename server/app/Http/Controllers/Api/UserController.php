<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function storeUser(Request $request) {
        $validatedData = $request->validate([
            'first_name' => ['required', 'max:55'],
            'middle_name' => ['nullable', 'max:55'],
            'last_name' => ['required', 'max:55'],
            'suffix_name' => ['nullable', 'max:55'],
            'birth_date' => ['required', 'date'],
            'contact_number' => ['required', 'numeric'],
            'email' => ['nullable', 'max:55'],
            'username' => ['required', 'max:12'],
            'password' => ['required', 'max:15'],
            'password_confirmation' => ['required', 'max:15', 'confirmed'],
        ]);
    }
}
