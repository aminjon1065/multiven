<?php

use App\Http\Controllers\Backend\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('dashboard', function () {
    return Inertia::render('backend/dashboard');
})->name('dashboard');

Route::resource('category', CategoryController::class)->names('category');
Route::patch('category-status/{category}', [CategoryController::class, 'changeStatus'])->name('category.changeStatus');
require __DIR__ . '/settings.php';
