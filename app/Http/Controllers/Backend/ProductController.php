<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ChildCategory;
use App\Models\Product;
use App\Models\SubCategory;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Str;

class ProductController extends Controller
{
    use ImageUploadTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $categories = Category::get(['id', 'name']);
        $subCategory = SubCategory::get(['id', 'name', 'category_id']);
        $childCategory = ChildCategory::get(['id', 'name', 'category_id', 'sub_category_id']);
        $brand = Brand::get(['id', 'name']);

        $search = $request->get('search');
        $sortField = $request->get('sortField', 'id');
        $sortDirection = $request->get('sortDirection', 'desc');

        $products = Product::query()
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('short_description', 'like', "%{$search}%")
                        ->orWhere('long_description', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('backend/product/index', [
            'categories' => $categories,
            'subCategories' => $subCategory,
            'childCategories' => $childCategory,
            'brands' => $brand,
            'filters' => [
                'search' => $search,
                'sortField' => $sortField,
                'sortDirection' => $sortDirection,
            ],
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        $categories = Category::get(['id', 'name']);
        $subCategory = SubCategory::get(['id', 'name', 'category_id']);
        $childCategory = ChildCategory::get(['id', 'name', 'category_id', 'sub_category_id']);
        $brand = Brand::get(['id', 'name']);
        return Inertia::render('backend/product/create', [
            'categories' => $categories,
            'subCategories' => $subCategory,
            'childCategories' => $childCategory,
            'brands' => $brand,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('thumb_image')) {
            $data['thumb_image'] = $this->uploadImage($request, 'thumb_image', 'uploads/products');
        }

        $data['vendor_id'] = Auth::id();
        $data['slug'] = Str::slug($data['name']);
        $data['is_approved'] = true;

        Product::create($data);

        return redirect()->route('admin.product.index')
            ->with('success', 'Product added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    public function changeStatus(Request $request, Product $product): RedirectResponse
    {
        $product->status = request()->boolean('status');
        $product->save();
        return redirect()->back();
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): \Inertia\Response
    {
        $categories = Category::get(['id', 'name']);
        $subCategory = SubCategory::get(['id', 'name', 'category_id']);
        $childCategory = ChildCategory::get(['id', 'name', 'category_id', 'sub_category_id']);
        $brand = Brand::get(['id', 'name']);
        return Inertia::render('backend/product/edit', [
//            'product' => $product->load(['category', 'subCategory', 'childCategory', 'brand']),
            'product' => $product,
            'categories' => $categories,
            'subCategories' => $subCategory,
            'childCategories' => $childCategory,
            'brands' => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {

        $data = $request->validated();
        $newImagePath = $this->updateImage(
            $request,
            'thumb_image',
            'uploads/products',
            $product->thumb_image
        );
        if ($newImagePath) {
            $data['thumb_image'] = $newImagePath;
        }
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $data['vendor_id'] = $product->vendor_id;
        $data['is_approved'] = $product->is_approved;
        $product->update($data);
        return redirect()
            ->route('admin.product.index')
            ->with('success', 'Товар успешно обновлен');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
