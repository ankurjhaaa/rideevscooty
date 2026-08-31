<?php

use App\Http\Controllers\AccessoryController;
use App\Http\Controllers\DealershipController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ScooterController;
use App\Http\Controllers\TestRideController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoController;


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/scooters', [ScooterController::class, 'index'])->name('scooters.index');
Route::get('/scooters/{product}', [ScooterController::class, 'show'])->name('scooters.show');
Route::get('/book-a-test-ride', [TestRideController::class, 'create'])->name('test-ride.create');
Route::post('/book-a-test-ride', [TestRideController::class, 'store'])->name('test-ride.store');

Route::inertia('/about', 'About')->name('about');
Route::inertia('/dealership', 'Contact')->name('dealership');
Route::post('/dealership', [DealershipController::class, 'store'])->name('dealership.store');
Route::inertia('/contact', 'ContactUs')->name('contact');
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::get('/accessories', [AccessoryController::class, 'index'])->name('accessories.index');
Route::get('/accessories/{accessory}', [AccessoryController::class, 'show'])->name('accessories.show');
Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index'])->name('sitemap');

Route::get('/accessories-seed', function () {
    \Illuminate\Support\Facades\Artisan::call('db:seed', ['--class' => 'AccessorySeeder']);
    return "Accessories seeded successfully!";
});

require __DIR__.'/admin.php';
