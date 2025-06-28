<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductVariant\ProductVariantItem\StoreProductVariantItemRequest;
use App\Http\Requests\Product\ProductVariant\ProductVariantItem\UpdateProductVariantItemRequest;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductVariantItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductVariantItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ProductVariant $variant): \Inertia\Response
    {
        $items = $variant->load('productVariantItems');
//        dd($items->toJson());
        return Inertia::render('backend/product/product-variant/product-variant-item/index', [
            'items' => $items
        ]);
    }


    public function changeStatus(Request $request, ProductVariantItem $variantItem): \Illuminate\Http\RedirectResponse
    {
        $variantItem->status = $request->boolean('status');
        $variantItem->save();
        return redirect()->back();
    }

    public function changeIsDefault(Request $request, ProductVariantItem $variantItem): \Illuminate\Http\RedirectResponse
    {
        $variantItem->is_default = $request->boolean('is_default');
        $variantItem->save();
        return redirect()->back();
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
    public function store(StoreProductVariantItemRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $productVariantItem = ProductVariantItem::create($validated);
        if ($productVariantItem)
        {
            return redirect()->back()->with('success', 'Product Variant Item Created Successfully');
        }
        return redirect()->back()->with('error', 'Something went wrong');
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
    public function destroy(ProductVariantItem $productVariantItem): \Illuminate\Http\RedirectResponse
    {
        $productVariantItem->delete();
        return redirect()->back();
    }
}
