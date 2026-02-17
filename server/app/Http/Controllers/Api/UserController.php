<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function loadUsers(Request $request) {
        $page = $request->input('page', 1);
        $search = $request->input('search');

        $users = User::with(['branch', 'role'])
            ->orderBy('last_name', 'asc')
            ->orderBy('first_name', 'asc')
            ->orderBy('middle_name', 'asc')
            ->orderBy('suffix_name', 'asc');

        if(!empty($search)) {
            $users->where(function ($query) use ($search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('middle_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('suffix_name', 'like', "%{$search}%");
            });
        }

        $users = $users->paginate(25, ['*'], 'page', $page);

        return response()->json([
            'users' => $users->items(),
            'currentPage' => $users->currentPage(),
            'lastPage' => $users->lastPage(),
        ], 200);
    }

    public function loadUserReferences() {
        $branches = Branch::orderBy('branch', 'asc')
            ->get();

        $roles = Role::orderBy('role', 'asc')
            ->get();

        return response()->json([
            'branches' => $branches,
            'roles' => $roles,
        ], 200);
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

        User::create([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $validatedData['middle_name'] ?? null,
            'last_name' => $validatedData['last_name'],
            'suffix_name' => $validatedData['suffix_name'] ?? null,
            'birth_date' => $validatedData['birth_date'],
            'contact_number' => $validatedData['contact_number'],
            'email' => $validatedData['email'] ?? null,
            'username' => $validatedData['username'],
            'password' => Hash::make($validatedData['password']),
            'branch_id' => $validatedData['branch_assigned'],
            'role_id' => $validatedData['role'],
        ]);

        return response()->json([
            'message' => 'User Successfully Created',
        ], 200);
    }

    public function updateUser(Request $request, User $user) {
        $validatedData = $request->validate([
            'first_name' => ['required', 'max:55'],
            'middle_name' => ['nullable', 'max:55'],
            'last_name' => ['required', 'max:55'],
            'suffix_name' => ['nullable', 'max:55'],
            'birth_date' => ['required', 'date'],
            'contact_number' => ['required', 'numeric'],
            'email' => ['nullable', 'email', 'max:55'],
            'branch_assigned' => ['required', Rule::exists('tbl_branches', 'branch_id')],
            'role' => ['required', Rule::exists('tbl_roles', 'role_id')],
        ]);

        $user->update([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $validatedData['middle_name'] ?? null,
            'last_name' => $validatedData['last_name'],
            'suffix_name' => $validatedData['suffix_name'] ?? null,
            'birth_date' => $validatedData['birth_date'],
            'contact_number' => $validatedData['contact_number'],
            'email' => $validatedData['email'] ?? null,
            'branch_id' => $validatedData['branch_assigned'],
            'role_id' => $validatedData['role'],
        ]);

        return response()->json([
            'message' => 'User Successfully Updated',
        ], 200);
    }

    public function deleteUser(User $user) {
        $user->delete();

        return response()->json([
            'message' => 'User Successfully Deleted',
        ], 200);
    }
}
