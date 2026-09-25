<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\FormController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CompanyMetricsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/company/share-value', [
    CompanyMetricsController::class,
    'shareValue'
]);

Route::post('/contact', [FormController::class, 'submitContact']);
Route::post('/careers/apply', [FormController::class, 'submitCareer']);
