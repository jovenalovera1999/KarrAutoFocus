<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function loadReports(Request $request)
    {
        $dateFrom = $request->input('date_from');
        $dateTo = $request->input('date_to');

        $baseQuery = Payment::query()
            ->when($dateFrom && $dateTo, function ($query) use ($dateFrom, $dateTo) {
                $query->whereBetween('payment_date', [$dateFrom, $dateTo]);
            });

        $reports = (clone $baseQuery)
            ->with([
            'car.make',
            'car.transmission',
            'car.color',
            'buyer',
            'payment_breakdown',
            'payment_method',
        ])
        ->orderByDesc('payment_date')
        ->get();

        $totalAmountByPaymentMethod = (clone $baseQuery)
            ->with('payment_method')
            ->select(
                'payment_method_id',
                DB::raw('SUM(amount) as total_amount'),
            )
            ->groupBy('payment_method_id')
            ->get();

        $grandTotal = (clone $baseQuery)
                ->sum('amount');

        return response()->json([
            'reports' => $reports,
            'totalAmountByPaymentMethod' => $totalAmountByPaymentMethod,
            'grandTotal' => $grandTotal,
        ], 200);
    }
}
