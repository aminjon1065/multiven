<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductImageGallery\StoreProductImageGalleryRequest;
use App\Http\Requests\Product\ProductImageGallery\UpdateProductImageGalleryRequest;
use App\Models\Product;
use App\Models\ProductImageGallery;
use App\Traits\ImageUploadTrait;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductImageGalleryController extends Controller
{
    use ImageUploadTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $product = Product::findOrFail($request->product);
        return Inertia::render('backend/product/product-gallery/index', [
            'product' => $product->load('productImageGalleries'),
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
    public function store(StoreProductImageGalleryRequest $request): \Illuminate\Http\RedirectResponse
    {
        $imagePaths = $this->uploadMultiImage($request, 'image', 'uploads');
        foreach ($imagePaths as $path) {
            $productImageGallery = new ProductImageGallery();
            $productImageGallery->image = $path;
            $productImageGallery->product_id = $request->product;
            $productImageGallery->save();
        }
        return redirect()->back()->with('success', 'Product Image Gallery Added Successfully');
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
    public function destroy(ProductImageGallery $products_image_gallery): \Illuminate\Http\RedirectResponse
    {
        $this->deleteImage($products_image_gallery->image);
        $products_image_gallery->delete();
        return redirect()->back()->with('success', 'Product Image Gallery Deleted Successfully');
    }
}
