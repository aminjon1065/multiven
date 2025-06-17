<?php

use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\ChildCategoryController;
use App\Http\Controllers\Backend\ProductController;
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
Route::patch('sub-category-status/{subCategory}', [SubCategoryController::class, 'changeStatus'])->name('sub-category.changeStatus');
//ChildCategory
Route::resource('child-category', ChildCategoryController::class)->names('child-category');
Route::patch('childe-category-status/{childCategory}', [ChildCategoryController::class, 'changeStatus'])->name('child-category.changeStatus');
//Brand
Route::resource('brand', BrandController::class)->names('brand');

//product
Route::resource('products', ProductController::class)->names('product');
require __DIR__ . '/settings.php';


