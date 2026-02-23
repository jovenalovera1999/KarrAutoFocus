<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnitExpense;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UnitExpenseController extends Controller
{
    public function storeUnitExpense(Request $request) {
        $validatedData = $request->validate([
            'car_id' => ['required', Rule::exists('tbl_cars', 'car_id')],
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
        ]);

        UnitExpense::create([
            'car_id' => $validatedData['car_id'],
            'amount' => $validatedData['amount'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Unit Expense Successfully Added',
        ], 200);
    }
}
