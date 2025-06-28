<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerProductController extends Controller
{
    public function sellerProductIndex(): \Inertia\Response
    {
        return Inertia::render('backend/product/seller-products/index', []);
    }

    public function pendingProductIndex(): \Inertia\Response
    {
        return Inertia::render('backend/product/pending-products/index', []);
    }

    public function changeApproveStatus(Request $request): \Illuminate\Http\RedirectResponse
    {
        $product = Product::findOrFail($request->id);
        $product->is_approved = $request->value;
        $product->save();
        return back()->with(['success' => 'Статус одобрения продукта обновлён']);
    }

}
