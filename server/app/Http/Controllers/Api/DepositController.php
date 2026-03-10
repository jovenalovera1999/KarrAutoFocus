<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Deposit;
use Illuminate\Http\Request;

class DepositController extends Controller
{
    public function loadDeposits(Request $request) {
        $page = $request->input('page');
        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        $deposits = Deposit::orderBy('created_at', 'desc');

        if(!empty($dateFrom) && !empty($dateTo)) {
            $deposits->where(function($query) use($dateFrom, $dateTo) {
                $query->whereBetween('created_at', [$dateFrom, $dateTo]);
            });
        }

        $deposits = $deposits->paginate(25, ['*'], 'page', $page);

        return response()->json([
            'data' => $deposits->items(),
            'currentPage' => $deposits->currentPage(),
            'lastPage' => $deposits->lastPage(),
        ], 200);
    }

    public function storeDeposit(Request $request) {
        $validatedData = $request->validate([
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
        ]);

        Deposit::create([
            'amount' => $validatedData['amount'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Deposit Successfully Saved',
        ], 200);
    }

    public function updateDeposit(Request $request, Deposit $deposit) {
        $validatedData = $request->validate([
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
        ]);

        $deposit->update([
            'amount' => $validatedData['amount'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Deposit Successfully Updated',
        ], 200);
    }

    public function deleteDeposit(Deposit $deposit) {
        $deposit->delete();

        return response()->json([
            'message' => 'Deposit Successfully Deleted',
        ], 200);
    }
}
