<?php

use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\ChildCategoryController;
use App\Http\Controllers\Backend\ProductController;
use App\Http\Controllers\Backend\ProductImageGalleryController;
use App\Http\Controllers\Backend\ProductVariantController;
use App\Http\Controllers\Backend\ProductVariantItemController;
use App\Http\Controllers\Backend\SellerProductController;
use App\Http\Controllers\Backend\SubCategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('dashboard', static function () {
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
Route::patch('product-status/{product}', [ProductController::class, 'changeStatus'])->name('product.changeStatus');
Route::resource('products-image-gallery', ProductImageGalleryController::class)->names('products-image-gallery');
Route::resource('product-variant', ProductVariantController::class)->names('product-variant');
Route::patch('product-variant-status/{productVariant}', [ProductVariantController::class, 'changeStatus'])->name('product-variant.changeStatus');
//ProductVariantItems
Route::get('products-variant-item/{variant}/items', [ProductVariantItemController::class, 'index'])->name('product-variant-item.index');
Route::patch('products-variant-item-status/{variantItem}', [ProductVariantItemController::class, 'changeStatus'])->name('product-variant-item.changeStatus');
Route::patch('products-variant-item-default/{variantItem}', [ProductVariantItemController::class, 'changeIsDefault'])->name('product-variant-item.change-is-default');
Route::post('product-variant-item/{variant}', [ProductVariantItemController::class, 'store'])->name('product-variant-item.store');

//Seller-products
Route::get('seller-products', [SellerProductController::class, 'sellerProductIndex'])->name('seller-products.index');
Route::get('seller-pending-products', [SellerProductController::class, 'pendingProductIndex'])->name('seller-pending-products.index');
Route::patch('change-approve-status', [SellerProductController::class, 'changeApproveStatus'])->name('change-approve-status');

require __DIR__ . '/settings.php';


