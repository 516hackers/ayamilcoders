<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\FormController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/contact', [FormController::class, 'submitContact']);
Route::post('/careers/apply', [FormController::class, 'submitCareer']);