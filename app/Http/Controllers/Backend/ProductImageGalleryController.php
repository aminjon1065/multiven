<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductImageGallery\StoreProductImageGalleryRequest;
use App\Http\Requests\Product\ProductImageGallery\UpdateProductImageGalleryRequest;
use App\Models\Product;
use App\Models\ProductImageGallery;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductImageGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $product = Product::findOrFail($request->product);
        return Inertia::render('backend/product/product-gallery/index', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductImageGalleryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductImageGallery $productImageGallery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductImageGallery $productImageGallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductImageGalleryRequest $request, ProductImageGallery $productImageGallery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductImageGallery $productImageGallery)
    {
        //
    }
}
