<?php

use App\Http\Controllers\Backend\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('dashboard', function () {
    return Inertia::render('backend/dashboard');
})->name('dashboard');

Route::resource('category', CategoryController::class)->names('category');


require __DIR__ . '/settings.php';
