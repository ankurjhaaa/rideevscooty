<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EnquiryController;
use App\Http\Controllers\Admin\ProductColorController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\Category;
use App\Models\Enquiry;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
        Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth')->group(function () {
        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
        Route::get('dashboard', fn() => Inertia::render('Admin/Dashboard', [
            'stats'           => [
                'categories'   => Category::count(),
                'products'     => Product::count(),
                'enquiries'    => Enquiry::count(),
                'newEnquiries' => Enquiry::where('status', 'new')->count(),
            ],
            'recentEnquiries' => Enquiry::orderByDesc('created_at')->limit(5)->get(),
        ]))->name('dashboard');
        Route::resource('categories', CategoryController::class)->except('show');
        Route::resource('products', ProductController::class);
        Route::delete('products/{product}/images/{image}', [ProductImageController::class, 'destroy'])->name('products.images.destroy');
        Route::delete('products/{product}/colors/{color}', [ProductColorController::class, 'destroy'])->name('products.colors.destroy');
        Route::get('enquiries', [EnquiryController::class, 'index'])->name('enquiries.index');
        Route::patch('enquiries/{enquiry}/status', [EnquiryController::class, 'updateStatus'])->name('enquiries.status');

        Route::get('settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('settings/website', [SettingController::class, 'updateWebsite'])->name('settings.website');
        Route::put('settings/social', [SettingController::class, 'updateSocial'])->name('settings.social');
        Route::put('settings/profile', [SettingController::class, 'updateProfile'])->name('settings.profile');
        Route::put('settings/password', [SettingController::class, 'updatePassword'])->name('settings.password');
    });
});
