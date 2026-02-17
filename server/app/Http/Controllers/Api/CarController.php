<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\CarStatus;
use App\Models\Color;
use App\Models\Encumbered;
use App\Models\EngineCc;
use App\Models\Make;
use App\Models\MotherFile;
use App\Models\TransferStatus;
use App\Models\Transmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CarController extends Controller
{
    public function loadCarReferences() {
        $makes = Make::orderBy('make', 'asc')
            ->get();

        $transmissions = Transmission::orderBy('transmission', 'asc')
            ->get();

        $carStatus = CarStatus::all();

        return response()->json([
            'makes' => $makes,
            'transmissions' => $transmissions,
            'carStatus' => $carStatus,
        ], 200);
    }

    public function storeCar(Request $request)
    {
        $validatedData = $request->validate([
            'color' => ['required', 'max:55'],
            'mother_file' => ['required', 'max:255'],
            'engine_cc' => ['required', 'max:55'],
            'encumbered' => ['nullable', 'max:255'],
            'transfer_status' => ['nullable', 'max:55'],

            'encode_date' => ['required', 'date'],
            'year_model' => ['required', 'max:55'],
            'make' => ['required', Rule::exists('tbl_makes', 'make_id')],
            'series' => ['required', 'max:255'],
            'transmission' => ['required', Rule::exists('tbl_transmissions', 'transmission_id')],
            'price' => ['required', 'numeric'],
            'plate_number' => ['required', 'max:255'],
            'mv_file_number' => ['required', 'max:255'],
            'engine_number' => ['required', 'max:255'],
            'chassis_number' => ['required', 'max:255'],
            'status' => ['required', Rule::exists('tbl_car_status', 'car_status_id')],
            'original_or_cr_received' => ['nullable', 'date'],
            'rod_received' => ['nullable', 'date'],
            'rod_paid' => ['nullable', 'date'],
            'last_registered' => ['nullable', 'date'],
            'confirmation_request' => ['nullable', 'date'],
            'confirmation_received' => ['nullable', 'date'],
            'hpg_clearance' => ['nullable', 'date'],
            'first_owner' => ['nullable', 'max:255'],
            'address' => ['nullable', 'max:255'],
        ]);

        DB::transaction(function () use ($validatedData) {

            $color = Color::firstOrCreate(['color' => $validatedData['color']]);
            $motherFile = MotherFile::firstOrCreate(['mother_file' => $validatedData['mother_file']]);
            $engineCc = EngineCc::firstOrCreate(['engine_cc' => $validatedData['engine_cc']]);
            $encumbered = $validatedData['encumbered']
                ? Encumbered::firstOrCreate(['encumbered' => $validatedData['encumbered']])
                : null;
            $transferStatus = $validatedData['transfer_status']
                ? TransferStatus::firstOrCreate(['transfer_status' => $validatedData['transfer_status']])
                : null;

            Car::create([
                'encode_date' => $validatedData['encode_date'],
                'year_model' => $validatedData['year_model'],
                'make_id' => $validatedData['make'],
                'series' => $validatedData['series'],
                'transmission_id' => $validatedData['transmission'],
                'color_id' => $color->color_id,
                'price' => $validatedData['price'],
                'plate_number' => $validatedData['plate_number'],
                'mother_file_id' => $motherFile->mother_file_id,
                'mv_file_number' => $validatedData['mv_file_number'],
                'engine_number' => $validatedData['engine_number'],
                'chassis_number' => $validatedData['chassis_number'],
                'engine_cc_id' => $engineCc->engine_cc_id,
                'car_status_id' => $validatedData['status'],
                'original_or_cr_received' => $validatedData['original_or_cr_received'],
                'encumbered_id' => $encumbered?->encumbered_id ?? null,
                'rod_received' => $validatedData['rod_received'],
                'rod_paid' => $validatedData['rod_paid'],
                'last_registered' => $validatedData['last_registered'],
                'confirmation_request' => $validatedData['confirmation_request'],
                'confirmation_received' => $validatedData['confirmation_received'],
                'hpg_clearance' => $validatedData['hpg_clearance'],
                'transfer_status_id' => $transferStatus?->transfer_status_id ?? null,
                'first_owner' => $validatedData['first_owner'],
                'address' => $validatedData['address'],
            ]);
        });

        return response()->json([
            'message' => 'Car successfully created'
        ], 200);
    }
}
