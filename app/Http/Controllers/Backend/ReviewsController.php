<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductReviews\StoreProductReviewsRequest;
use App\Http\Requests\Product\ProductReviews\UpdateProductReviewsRequest;
use App\Models\ProductReviews;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        $reviews = ProductReviews::with(['product:id,name', 'vendor:id,shop_name', 'user:id,name'])->paginate(15);
        return Inertia::render('backend/reviews/index', [
            'reviews' => $reviews,
        ]);
    }


    public function changeStatus(Request $request, ProductReviews $review): RedirectResponse
    {
        $review->status = $request->status;
        $review->save();
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
    public function store(StoreProductReviewsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductReviews $reviews)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductReviews $reviews)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductReviewsRequest $request, ProductReviews $reviews)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductReviews $reviews)
    {
        //
    }
}
