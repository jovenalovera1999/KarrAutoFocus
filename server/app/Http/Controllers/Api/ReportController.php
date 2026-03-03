<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    // public function loadReports()
    // {
    //     $reports = Car::with([
    //         'make',
    //         'transmission',
    //         'color',
    //         'mother_file',
    //         'engine_cc',
    //         'car_status',
    //         'encumbered',
    //         'transfer_status',
    //         'payments.payment_method',
    //         'buyer.payments.payment_method',
    //         'buyer.payment_breakdowns.payments.payment_method',
    //         'payment_breakdown.payments.payment_method',
    //     ])->get()->map(function ($car) {

    //         // Resolve payments in order of priority
    //         $payments = collect();

    //         // Car direct payments
    //         if ($car->payments->isNotEmpty()) {
    //             $payments = $car->payments;
    //         }
    //         // Buyer's payment_breakdowns payments
    //         elseif ($car->buyer?->payment_breakdowns->isNotEmpty()) {
    //             $payments = $car->buyer->payment_breakdowns->flatMap(fn($pb) => $pb->payments);
    //         }
    //         // Buyer's direct payments
    //         elseif ($car->buyer?->payments->isNotEmpty()) {
    //             $payments = $car->buyer->payments;
    //         }
    //         // Car's payment_breakdown payments
    //         elseif ($car->payment_breakdown?->payments->isNotEmpty()) {
    //             $payments = $car->payment_breakdown->payments;
    //         }

    //         $firstPayment = $payments->first(); // Pick first payment (can adjust logic)

    //         return [
    //             'car_id' => $car->car_id,
    //             'year_model' => $car->year_model ?? '-',
    //             'make' => $car->make?->make ?? '-',
    //             'series' => $car->series ?? '-',
    //             'transmission' => $car->transmission?->transmission ?? '-',
    //             'color' => $car->color?->color ?? '-',
    //             'buyer' => $car->buyer?->buyer ?? '-',
    //             'payment_date' => $firstPayment?->payment_date ?? '-',
    //             'payment_method' => $firstPayment?->payment_method?->payment_method ?? '-',
    //             'amount' => $firstPayment?->amount ?? '-',
    //             // add more flattened fields as needed
    //         ];
    //     });

    //     return response()->json([
    //         'reports' => $reports
    //     ], 200);
    // }

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
