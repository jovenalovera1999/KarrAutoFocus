<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Models\Buyer;
use App\Models\Car;
use App\Traits\RestoreOrCreate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BuyerController extends Controller
{
    use RestoreOrCreate;

    public function storeBuyer(Request $request) {
        $carId = $request->input('car_id');

        $validatedData = $request->validate([
            'buyer' => ['required', 'max:255'],
            'address' => ['required', 'max:255'],
            'agreed_price' => ['nullable', 'numeric'],
            'date_reserved' => ['nullable', 'date'],
            'agent' => ['required', 'max:255'],
        ]);

        $car = Car::where('car_id', $carId)
            ->firstOrFail();

        DB::transaction(function () use ($validatedData, $car) {
            $agent = $this->restoreOrCreate(Agent::class, 'agent', $validatedData['agent']);

            $buyer = Buyer::create([
                'buyer' => $validatedData['buyer'],
                'address' => $validatedData['address'],
                'agreed_price' => $validatedData['agreed_price'],
                'date_reserved' => $validatedData['date_reserved'],
                'agent_id' => $agent->agent_id,
            ]);

            $car->update([
                'buyer_id' => $buyer->buyer_id ?? null,
            ]);
        });

        return response()->json([
            'message' => 'Buyer Information Successfully Saved',
        ], 200);
    }

    public function updateBuyer(Request $request, Buyer $buyer) {
        $validatedData = $request->validate([
            'buyer' => ['required', 'max:255'],
            'address' => ['required', 'max:255'],
            'agreed_price' => ['nullable', 'numeric'],
            'date_reserved' => ['nullable', 'date'],
            'agent' => ['required', 'max:255'],
        ]);

        DB::transaction(function () use ($validatedData, $buyer) {
            $agent = $this->restoreOrCreate(Agent::class, 'agent', $validatedData['agent']);

            $buyer->update([
                'buyer' => $validatedData['buyer'],
                'address' => $validatedData['address'],
                'agreed_price' => $validatedData['agreed_price'],
                'date_reserved' => $validatedData['date_reserved'],
                'agent_id' => $agent->agent_id,
            ]);
        });

        return response()->json([
            'message' => 'Buyer Information Successfully Updated',
        ], 200);
    }
}
