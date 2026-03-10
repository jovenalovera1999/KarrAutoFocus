<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PettyCash;
use Illuminate\Http\Request;

class PettyCashController extends Controller
{
    public function loadPettyCash(Request $request) {
        $page = $request->input('page', 1);
        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        $pettyCash = PettyCash::orderBy('created_at', 'desc');

        if(!empty($dateFrom) && !empty($dateTo)) {
            $pettyCash->where(function ($query) use ($dateFrom, $dateTo) {
                $query->whereBetween('created_at', [$dateFrom, $dateTo]);
            });
        }

        $pettyCash = $pettyCash->paginate(25, ['*'], 'page', $page);

        return response()->json([
            'data' => $pettyCash->items(),
            'currentPage' => $pettyCash->currentPage(),
            'lastPage' => $pettyCash->lastPage(),
        ], 200);
    }

    public function storePettyCash(Request $request) {
        $validatedData = $request->validate([
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
        ]);

        PettyCash::create([
            'amount' => $validatedData['amount'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Petty Cash Successfully Saved',
        ], 200);
    }

    public function updatePettyCash(Request $request, PettyCash $pettyCash) {
        $validatedData = $request->validate([
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
        ]);

        $pettyCash->update([
            'amount' => $validatedData['amount'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Petty Cash Successfully Updated',
        ], 200);
    }

    public function deletePettyCash(PettyCash $pettyCash) {
        $pettyCash->delete();

        return response()->json([
            'message' => 'Petty Cash Successfully Deleted',
        ], 200);
    }
}
