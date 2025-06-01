<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductVariant\ProductVariantItem\StoreProductVariantItemRequest;
use App\Http\Requests\Product\ProductVariant\ProductVariantItem\UpdateProductVariantItemRequest;
use App\Models\ProductVariantItem;

class ProductVariantItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreProductVariantItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariantItem $productVariantItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductVariantItem $productVariantItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductVariantItemRequest $request, ProductVariantItem $productVariantItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariantItem $productVariantItem)
    {
        //
    }
}
