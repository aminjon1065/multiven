<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderRequest;
use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('backend/order/index', [

        ]);
    }

    public function pendingProducts(): \Inertia\Response
    {
        return Inertia::render('backend/order/pending', []);
    }

    public function processedOrders(): \Inertia\Response
    {
        return Inertia::render('backend/order/processed', []);
    }

    public function droppedOffOrders(): \Inertia\Response
    {
        return Inertia::render('backend/order/dropped-off-orders', []);
    }

    public function shippedOrders()
    {
        return Inertia::render('backend/order/shipped-orders', []);
    }

    public function outForDeliveryOrders()
    {
        return Inertia::render('backend/order/out-for-delivery-orders', []);
    }

    public function deliveredOrders()
    {
        return Inertia::render('backend/order/delivered-orders', []);
    }

    public function canceledOrders()
    {
        return Inertia::render('backend/order/canceled-orders', []);
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
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
