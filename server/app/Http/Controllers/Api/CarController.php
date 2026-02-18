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
    public function loadAllUnits(Request $request)
    {
        $page = $request->input('page', 1);
        $search = $request->input('search');

        $cars = Car::with([
            'make',
            'transmission',
            'mother_file',
            'engine_cc',
            'car_status',
            'encumbered',
            'transfer_status'
        ])
        ->orderBy('created_at', 'desc')
        ->orderBy('encode_date', 'desc');

        if (!empty($search)) {

            $cars->where(function ($query) use ($search) {

                // ==== tbl_cars columns ====
                $query->where('year_model', 'like', "%{$search}%")
                    ->orWhere('series', 'like', "%{$search}%")
                    ->orWhere('plate_number', 'like', "%{$search}%")
                    ->orWhere('mv_file_number', 'like', "%{$search}%")
                    ->orWhere('engine_number', 'like', "%{$search}%")
                    ->orWhere('chassis_number', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
                    ->orWhere('first_owner', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");

                // ==== Related Tables ====

                $query->orWhereHas('make', function ($q) use ($search) {
                    $q->where('make', 'like', "%{$search}%");
                });

                $query->orWhereHas('transmission', function ($q) use ($search) {
                    $q->where('transmission', 'like', "%{$search}%");
                });

                $query->orWhereHas('mother_file', function ($q) use ($search) {
                    $q->where('mother_file', 'like', "%{$search}%");
                });

                $query->orWhereHas('engine_cc', function ($q) use ($search) {
                    $q->where('engine_cc', 'like', "%{$search}%");
                });

                $query->orWhereHas('car_status', function ($q) use ($search) {
                    $q->where('car_status', 'like', "%{$search}%");
                });

                $query->orWhereHas('encumbered', function ($q) use ($search) {
                    $q->where('encumbered', 'like', "%{$search}%");
                });

                $query->orWhereHas('transfer_status', function ($q) use ($search) {
                    $q->where('transfer_status', 'like', "%{$search}%");
                });
            });
        }

        $cars = $cars->paginate(25, ['*'], 'page', $page);

        return response()->json([
            'cars' => $cars->items(),
            'currentPage' => $cars->currentPage(),
            'lastPage' => $cars->lastPage(),
        ], 200);
    }

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
            'year_model' => ['required', 'max:255'],
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
            $color = Color::withTrashed()
                ->firstOrCreate([
                    'color' => $validatedData['color']
                ]);

            if($color->trashed()) {
                $color->restore();
            }

            $motherFile = MotherFile::withTrashed()
                ->firstOrCreate([
                    'mother_file' => $validatedData['mother_file']
                ]);

            if($motherFile->trashed()) {
                $motherFile->restore();
            }

            $engineCc = EngineCc::withTrashed()
                ->firstOrCreate([
                    'engine_cc' => $validatedData['engine_cc']
                ]);

            if($engineCc->trashed()) {
                $engineCc->restore();
            }

            $encumbered = null;

            if(!empty($validatedData['encumbered'])){
                $encumbered = Encumbered::withTrashed()
                    ->firstOrCreate([
                        'encumbered' => $validatedData['encumbered']
                    ]);

                if($encumbered->trashed()) {
                    $encumbered->restore();
                }
            }

            $transferStatus = null;

            if(!empty($validatedData['transfer_status'])) {
                $transferStatus = TransferStatus::withTrashed()
                    ->firstOrCreate([
                        'transfer_status' => $validatedData['transfer_status']
                    ]);

                if($transferStatus->trashed()) {
                    $transferStatus->restore();
                }
            }

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
