<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarStatus;
use App\Models\Make;
use App\Models\Transmission;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function loadCarReferences() {
        $makes = Make::orderBy('make', 'asc')
            ->get();

        $transmissions = Transmission::orderBy('transmission', 'asc')
            ->get();

        $carStatus = CarStatus::all();

        if($makes && $transmissions && $carStatus) {
            return response()->json([
                'makes' => $makes,
                'transmissions' => $transmissions,
                'carStatus' => $carStatus,
            ], 200);
        }
    }
}
