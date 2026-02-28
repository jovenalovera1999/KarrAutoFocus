<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Finance;
use App\Models\PaymentBreakdown;
use App\Models\Term;
use App\Traits\RestoreOrCreate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PaymentBreakdownController extends Controller
{
    use RestoreOrCreate;

    public function storePaymentBreakdown(Request $request) {
        $validatedData = $request->validate([
            'car' => [Rule::exists('tbl_cars', 'car_id')],
            'buyer' => [Rule::exists('tbl_buyers', 'buyer_id')],
            'downpayment' => ['nullable', 'numeric'],
            'processing_fee' => ['nullable', 'numeric'],
            'service_fee' => ['nullable', 'numeric'],
            'transfer' => ['nullable', 'numeric'],
            'finance' => ['required', 'max:55'],
            'term' => ['required', 'max:55'],
        ]);

        DB::transaction(function() use ($validatedData) {
            $finance = null;
            if(!empty($validatedData['finance'])) {
                $finance = $this->restoreOrCreate(Finance::class, 'finance', $validatedData['finance']);
            }

            $term = null;
            if(!empty($validatedData['term'])) {
                $term = $this->restoreOrCreate(Term::class, 'term', $validatedData['term']);
            }

            PaymentBreakdown::create([
                'car_id' => $validatedData['car'],
                'buyer_id' => $validatedData['buyer'],
                'downpayment' => $validatedData['downpayment'] ?? null,
                'processing_fee' => $validatedData['processing_fee'] ?? null,
                'service_fee' => $validatedData['service_fee'] ?? null,
                'transfer' => $validatedData['transfer'] ?? null,
                'finance_id' => $finance->finance_id ?? null,
                'term_id' => $term->term_id ?? null,
            ]);
        });

        return response()->json([
            'message' => 'Payment Breakdown Successfully Saved',
        ], 200);
    }

    public function updatePaymentBreakdown(Request $request, PaymentBreakdown $paymentBreakdown) {
        $validatedData = $request->validate([
            'downpayment' => ['nullable', 'numeric'],
            'processing_fee' => ['nullable', 'numeric'],
            'service_fee' => ['nullable', 'numeric'],
            'transfer' => ['nullable', 'numeric'],
            'finance' => ['required', 'max:55'],
            'term' => ['required', 'max:55'],
        ]);

        DB::transaction(function() use ($validatedData, $paymentBreakdown) {
            $finance = null;
            if(!empty($validatedData['finance'])) {
                $finance = $this->restoreOrCreate(Finance::class, 'finance', $validatedData['finance']);
            }

            $term = null;
            if(!empty($validatedData['term'])) {
                $term = $this->restoreOrCreate(Term::class, 'term', $validatedData['term']);
            }

            $paymentBreakdown->update([
                'downpayment' => $validatedData['downpayment'] ?? null,
                'processing_fee' => $validatedData['processing_fee'] ?? null,
                'service_fee' => $validatedData['service_fee'] ?? null,
                'transfer' => $validatedData['transfer'] ?? null,
                'finance_id' => $finance->finance_id ?? null,
                'term_id' => $term->term_id ?? null,
            ]);
        });

        return response()->json([
            'message' => 'Payment Breakdown Successfully Updated',
        ], 200);
    }
}
