<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategory\SubCategoryRequest;
use App\Http\Requests\SubCategory\SubcategoryUpdateRequest;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $categories = Category::get(['id', 'name']);
        $search = $request->get('search');
        $subCategory = SubCategory::query()
            ->with('category')
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%")
            )
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();
        return Inertia::render('backend/sub-category/index', [
            'subCategory' => $subCategory,
            'filters' => [
                'search' => $search,
            ],
            'categories' => $categories,
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
    public function store(SubCategoryRequest $request)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);
        $subCategory = SubCategory::create($validated);
        if ($subCategory) {
            return back()->with('success', 'Sub Category created successfully.');
        }
        return back()->with('error', 'Something went wrong.');

    }

    public function changeStatus(Request $request, SubCategory $subCategory): \Illuminate\Http\RedirectResponse
    {
        $subCategory->status = $request->boolean('status');
        $subCategory->save();
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubcategoryUpdateRequest $request, SubCategory $subCategory): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);
        $subCategory->update($validated);
        return back()->with('success', 'Sub Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory): \Illuminate\Http\RedirectResponse
    {
        $subCategory->delete();
        return back()->with('success', 'Успешно удалено!');
    }
}
