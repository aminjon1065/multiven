<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChildCategory\StoreChildCategoryRequest;
use App\Http\Requests\ChildCategory\UpdateChildCategoryRequest;
use App\Models\ChildCategory;
use Inertia\Inertia;

class ChildCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('backend/child-category/index');
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
    public function store(StoreChildCategoryRequest $request)
    {
        //
    }

    public function changeStatus(\Request $request, ChildCategory $childCategory): \Illuminate\Http\RedirectResponse
    {
        $childCategory->status = $request->status;
        $childCategory->save();
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(ChildCategory $childCategory)
    {
        //
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
    public function update(UpdateChildCategoryRequest $request, ChildCategory $childCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChildCategory $childCategory)
    {
        //
    }
}
