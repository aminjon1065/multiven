<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductVariant\StoreProductVariantRequest;
use App\Http\Requests\Product\ProductVariant\UpdateProductVariantRequest;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $product = Product::findOrFail($request->product);
        return Inertia::render('backend/product/product-variant/index', [
            'product' => $product->load(['variants']),
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
    public function store(StoreProductVariantRequest $request): \Illuminate\Http\RedirectResponse
    {
        $data = $request->validated();
        $productVariant = ProductVariant::create($data);
        if ($productVariant) {
            return back()->with(['success' => 'Product Variant Created Successfully']);
        }
        return back()->with(['error' => 'Product Variant Created Failed']);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariant $productVariant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductVariant $productVariant)
    {
        //
    }

    public function changeStatus(ProductVariant $productVariant, Request $request)
    {
        $productVariant->status =  $request->boolean('status');
        $productVariant->save();
        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductVariantRequest $request, ProductVariant $productVariant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariant $productVariant): \Illuminate\Http\RedirectResponse
    {
        $productVariant->delete();
        return redirect()->back();
    }
}
