<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function loadExpenses(Request $request) {
        $page = $request->input('page', 1);
        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        $expenses = Expense::orderBy('created_at', 'desc');

        if(!empty($dateFrom) && !empty($dateTo)) {
            $expenses->where(function ($query) use ($dateFrom, $dateTo) {
                $query->whereBetween('created_at', [$dateFrom, $dateTo]);
            });
        }

        $expenses = $expenses->paginate(25, ['*'], 'page', $page);

        return response()->json([
            'expenses' => $expenses->items(),
            'currentPage' => $expenses->currentPage(),
            'lastPage' => $expenses->lastPage(),
        ], 200);
    }

    public function storeExpense(Request $request) {
        $validatedData = $request->validate([
            'incurrence_date' => ['required', 'date'],
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
        ]);

        Expense::create([
            'incurrence_date' => $validatedData['incurrence_date'],
            'amount' => $validatedData['amount'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Expense Successfully Added',
        ], 200);
    }
}
