<?php

use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\SubCategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('dashboard', function () {
    return Inertia::render('backend/dashboard');
})->name('dashboard');

//Category
Route::resource('category', CategoryController::class)->names('category');
Route::patch('category-status/{category}', [CategoryController::class, 'changeStatus'])->name('category.changeStatus');
//SubCategory
Route::resource('sub-category', SubCategoryController::class)->names('sub-category');
require __DIR__ . '/settings.php';
