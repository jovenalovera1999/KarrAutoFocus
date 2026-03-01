<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function loadReports() {
        $reports = Car::with([
            'make',
            'transmission',
            'color',
            'mother_file',
            'engine_cc',
            'car_status',
            'encumbered',
            'transfer_status',
        ]);
    }
}
