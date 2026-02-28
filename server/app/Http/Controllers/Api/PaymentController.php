<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PaymentController extends Controller
{
    public function storePayment(Request $request) {
        $carId = $request->input('car_id');
        $buyerId = $request->input('buyer_id');
        $paymentBreakdownId = $request->input('payment_breakdown_id');

        $validatedData = $request->validate([
            'payment_date' => ['required', 'date'],
            'amount' => ['required', 'numeric'],
            'description' => ['required', 'max:255'],
            'payment_method' => ['required', Rule::exists('tbl_payment_methods', 'payment_method_id')],
        ]);

        Payment::create([
            'car_id' => $carId ?? null,
            'buyer_id' => $buyerId ?? null,
            'payment_breakdown_id' => $paymentBreakdownId ?? null,
            'payment_method_id' => $validatedData['payment_method'],
            'payment_date' => $validatedData['payment_date'],
            'amount' => $validatedData['amount'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Payment Successfully Saved',
        ], 200);
    }
}
