<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function loadUserReferences() {
        $branches = Branch::orderBy('branch', 'asc')
            ->get();

        $roles = Role::orderBy('role', 'asc')
            ->get();

        if($branches && $roles) {
            return response()->json([
                'branches' => $branches,
                'roles' => $roles,
            ], 200);
        }
    }

    public function storeUser(Request $request) {
        $validatedData = $request->validate([
            'first_name' => ['required', 'max:55'],
            'middle_name' => ['nullable', 'max:55'],
            'last_name' => ['required', 'max:55'],
            'suffix_name' => ['nullable', 'max:55'],
            'birth_date' => ['required', 'date'],
            'contact_number' => ['required', 'numeric'],
            'email' => ['nullable', 'max:55'],
            'username' => ['required', 'max:12', 'regex:/^\S+$/', Rule::unique('tbl_users', 'username')],
            'password' => ['required', 'max:15', 'regex:/^\S+$/', 'confirmed'],
            'password_confirmation' => ['required', 'max:15', 'regex:/^\S+$/'],
            'branch_assigned' => ['required', Rule::exists('tbl_branches', 'branch_id')],
            'role' => ['required', Rule::exists('tbl_roles', 'role_id')],
        ]);

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $validatedData['middle_name'],
            'last_name' => $validatedData['last_name'],
            'suffix_name' => $validatedData['suffix_name'],
            'birth_date' => $validatedData['birth_date'],
            'contact_number' => $validatedData['contact_number'],
            'email' => $validatedData['email'],
            'username' => $validatedData['username'],
            'password' => $validatedData['password'],
            'branch_id' => $validatedData['branch_assigned'],
            'role_id' => $validatedData['role'],
        ]);

        if($user) {
            return response()->json([
                'message' => 'User Successfully Created',
            ], 201);
        }
    }
}
