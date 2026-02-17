<?php

use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(UserController::class)->prefix('/user')->group(function() {
    Route::get('/loadUsers', 'loadUsers');
    Route::get('/loadUserReferences', 'loadUserReferences');
    Route::post('/storeUser', 'storeUser');
    Route::put('/updateUser/{user}', 'updateUser');
    Route::delete('/deleteUser/{user}', 'deleteUser');
});

Route::controller(CarController::class)->prefix('/car')->group(function() {
    Route::get('/loadCarReferences', 'loadCarReferences');
    Route::post('/storeCar', 'storeCar');
});
