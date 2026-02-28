<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function loadPaymentMethods() {
        $paymentMethods = PaymentMethod::all();

        return response()->json([
            'paymentMethods' => $paymentMethods,
        ], 200);
    }
}
