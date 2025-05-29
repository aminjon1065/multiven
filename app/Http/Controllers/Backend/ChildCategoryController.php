<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChildCategory\StoreChildCategoryRequest;
use App\Http\Requests\ChildCategory\UpdateChildCategoryRequest;
use App\Models\Category;
use App\Models\ChildCategory;
use App\Models\SubCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Str;

class ChildCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $categories = Category::get(['id', 'name']);
        $subCategory = SubCategory::get(['id', 'name']);
        $search = $request->get('search');
        $childCategory = ChildCategory::query()
            ->with(['category', 'subCategory'])
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%"))
            ->orWhere('slug', 'like', "%{$search}%")
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString();
        return Inertia::render('backend/child-category/index', [
            'categories' => $categories,
            'subCategories' => $subCategory,
            'filters' => [
                'search' => $search,
            ],
            'childCategories' => $childCategory
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Illuminate\Http\RedirectResponse
    {
        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChildCategoryRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);
        $childCategory = ChildCategory::create($validated);
        if ($childCategory) {
            return redirect()->back('201')->with(['success' => 'Успешно создано!']);
        }
        return redirect()->back();
    }

    public function changeStatus(Request $request, ChildCategory $childCategory): \Illuminate\Http\RedirectResponse
    {
        $childCategory->status = $request->boolean('status');
        $childCategory->save();
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(ChildCategory $childCategory): \Illuminate\Http\RedirectResponse
    {
        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChildCategory $childCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChildCategoryRequest $request, ChildCategory $childCategory): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);
        $childCategory->update($validated);
        return redirect()->back()->with('success', 'Успешно обновлено!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChildCategory $childCategory): \Illuminate\Http\RedirectResponse
    {
        $childCategory->delete();
        return redirect()->back()->with('success', 'Удалено!');
    }
}
