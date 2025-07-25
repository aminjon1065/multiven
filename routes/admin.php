<?php

use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\ChildCategoryController;
use App\Http\Controllers\Backend\CouponController;
use App\Http\Controllers\Backend\FlashSaleController;
use App\Http\Controllers\Backend\OrderController;
use App\Http\Controllers\Backend\PaymentSettingsController;
use App\Http\Controllers\Backend\ProductController;
use App\Http\Controllers\Backend\ProductImageGalleryController;
use App\Http\Controllers\Backend\ProductVariantController;
use App\Http\Controllers\Backend\ProductVariantItemController;
use App\Http\Controllers\Backend\ReviewsController;
use App\Http\Controllers\Backend\SellerProductController;
use App\Http\Controllers\Backend\SubCategoryController;
use App\Http\Controllers\Backend\TransactionController;
use App\Http\Controllers\Backend\ShippingRuleController;
use App\Http\Controllers\Backend\VendorProfileController;
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
Route::patch('brand-status/{brand}', [BrandController::class, 'changeStatus'])->name('brand.changeStatus');

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

//ProductReviews
Route::resource('reviews', ReviewsController::class)->names('reviews');
Route::patch('review-status/{review}', [ReviewsController::class, 'changeStatus'])->name('reviews.changeStatus');
require __DIR__ . '/settings.php';

//Orders
Route::resource('orders', OrderController::class)->names('orders');
Route::get('pending-orders', [OrderController::class, 'pendingProducts'])->name('pending-orders');
Route::get('processed-orders', [OrderController::class, 'processedOrders'])->name('processed-orders');
Route::get('dropped-off-orders', [OrderController::class, 'droppedOffOrders'])->name('dropped-off-orders');
Route::get('shipped-orders', [OrderController::class, 'shippedOrders'])->name('shipped-orders');
Route::get('out-for-delivery-orders', [OrderController::class, 'outForDeliveryOrders'])->name('out-for-delivery-orders');
Route::get('delivered-orders', [OrderController::class, 'deliveredOrders'])->name('delivered-orders');
Route::get('canceled-orders', [OrderController::class, 'canceledOrders'])->name('canceled-orders');

//Transaction
Route::get('transactions', [TransactionController::class, 'index'])->name('transactions.index');

//E-com
Route::resource('flash-sale', FlashSaleController::class)->names('flash-sales');
Route::resource('coupons', CouponController::class)->names('coupons');
Route::resource('shipping-rule', ShippingRuleController::class)->names('shipping-rule');
Route::resource('vendor-profile', VendorProfileController::class)->names('vendor-profile');
Route::resource('payment-settings', PaymentSettingsController::class)->names('payment-settings');

