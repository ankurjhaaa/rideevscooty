<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ScooterController;
use App\Http\Controllers\TestRideController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/scooters/{product}', [ScooterController::class, 'show'])->name('scooters.show');
Route::get('/book-a-test-ride', [TestRideController::class, 'create'])->name('test-ride.create');
Route::post('/book-a-test-ride', [TestRideController::class, 'store'])->name('test-ride.store');

require __DIR__.'/admin.php';
