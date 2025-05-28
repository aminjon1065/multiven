<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $search = $request->get('search');

        $category = Category::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%")
            )
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('backend/category/index', [
            'category' => $category,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }


    public function changeStatus(Request $request, Category $category): \Illuminate\Http\RedirectResponse
    {
        $category->status = $request->boolean('status');
        $category->save();

        return redirect()->back();
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
    public function store(CategoryRequest $request)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);
        $category = Category::create($validated);
        if ($category) {
            return back()->with(['success' => 'Успешно создано']);
        }
        return back()->withErrors(['msg' => 'Ошибка при создании']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $request, Category $category): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);
        if ($category) {
            return back()->with(['success' => 'Успешно обновлено']);
        }
        return back()->withErrors(['msg' => 'Ошибка при обновлении']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): \Illuminate\Http\RedirectResponse
    {
        $category->delete();
        return back()->with(['success' => 'Успешно удалено!']);
    }
}
