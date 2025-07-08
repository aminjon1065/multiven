<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\ShippingRule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShippingRuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('backend/e-com/shipping-rule/index',[]);
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
    public function show(ShippingRule $shippingRule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShippingRule $shippingRule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShippingRule $shippingRule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShippingRule $shippingRule)
    {
        //
    }
}
