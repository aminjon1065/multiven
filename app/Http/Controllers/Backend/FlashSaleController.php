<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\FlashSale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlashSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('backend/e-com/flash-sale/flash-sale', []);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(FlashSale $flashSale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FlashSale $flashSale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FlashSale $flashSale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FlashSale $flashSale)
    {
        //
    }
}
