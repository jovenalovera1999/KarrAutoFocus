<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BuyerController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\DepositController;
use App\Http\Controllers\Api\OfficeExpenseController;
use App\Http\Controllers\Api\PaymentBreakdownController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PaymentMethodController;
use App\Http\Controllers\Api\PettyCashController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\UnitExpenseController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user()->load(['branch', 'role']);
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->prefix('/auth')->group(function() {
    Route::post('/login', 'login')->middleware('throttle:5,1');
});

Route::middleware('auth:sanctum')->group(function() {
    Route::controller(AuthController::class)->prefix('/auth')->group(function() {
        Route::post('/logout', 'logout');
    });

    Route::controller(UserController::class)->prefix('/user')->group(function() {
        Route::get('/loadUsers', 'loadUsers');
        Route::get('/loadUserReferences', 'loadUserReferences');
        Route::post('/storeUser', 'storeUser');
        Route::put('/updateUser/{user}', 'updateUser');
        Route::delete('/deleteUser/{user}', 'deleteUser');
    });

    Route::controller(CarController::class)->prefix('/car')->group(function() {
        Route::get('/loadAllUnits', 'loadAllUnits');
        Route::get('/loadAvailableUnits', 'loadAvailableUnits');
        Route::get('/loadReservedUnits', 'loadReservedUnits');
        Route::get('/loadSoldUnits', 'loadSoldUnits');
        Route::get('/loadCarReferences', 'loadCarReferences');
        Route::get('/getCar/{car}', 'getCar');
        Route::post('/storeCar', 'storeCar');
        Route::put('/updateCar/{car}', 'updateCar');
        Route::delete('/deleteCar/{car}', 'deleteCar');
    });

    Route::controller(OfficeExpenseController::class)->prefix('/office_expense')->group(function() {
        Route::get('/loadOfficeExpenses', 'loadOfficeExpenses');
        Route::post('/storeOfficeExpense', 'storeOfficeExpense');
        Route::put('/updateOfficeExpense/{officeExpense}', 'updateOfficeExpense');
        Route::delete('/deleteOfficeExpense/{officeExpense}', 'deleteOfficeExpense');
    });

    Route::controller(UnitExpenseController::class)->prefix('/unit_expense')->group(function() {
        Route::post('/storeUnitExpense', 'storeUnitExpense');
    });

    Route::controller(BuyerController::class)->prefix('/buyer')->group(function() {
        Route::post('/storeBuyer', 'storeBuyer');
        Route::put('/updateBuyer/{buyer}', 'updateBuyer');
    });

    Route::controller(PaymentBreakdownController::class)->prefix('/payment_breakdown')->group(function() {
        Route::post('/storePaymentBreakdown', 'storePaymentBreakdown');
        Route::put('/updatePaymentBreakdown/{paymentBreakdown}', 'updatePaymentBreakdown');
    });

    Route::controller(PaymentMethodController::class)->prefix('/payment_method')->group(function() {
        Route::get('/loadPaymentMethods', 'loadPaymentMethods');
    });

    Route::controller(PaymentController::class)->prefix('/payment')->group(function() {
        Route::post('/storePayment', 'storePayment');
    });

    Route::controller(ReportController::class)->prefix('/report')->group(function() {
        Route::get('/loadReports', 'loadReports');
    });

    Route::controller(PettyCashController::class)->prefix('/petty_cash')->group(function() {
        Route::get('/loadPettyCash', 'loadPettyCash');
        Route::post('/storePettyCash', 'storePettyCash');
        Route::put('/updatePettyCash/{pettyCash}', 'updatePettyCash');
        Route::delete('deletePettyCash/{pettyCash}', 'deletePettyCash');
    });

    Route::controller(DepositController::class)->prefix('/deposit')->group(function() {
        Route::get('/loadDeposits', 'loadDeposits');
        Route::post('/storeDeposit', 'storeDeposit');
        Route::put('/updateDeposit/{deposit}', 'updateDeposit');
        Route::delete('/deleteDeposit/{deposit}', 'deleteDeposit');
    });
});

