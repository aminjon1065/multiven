<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerProductController extends Controller
{
    public function sellerProductIndex(Request $request): \Inertia\Response
    {

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
            ->whereNot('vendor_id', auth()->user()->id)
            ->orderBy($sortField, $sortDirection)
            ->paginate(15)
            ->withQueryString();
        return Inertia::render('backend/product/seller-products/index', [
            'filters' => [
                'search' => $search,
                'sortField' => $sortField,
                'sortDirection' => $sortDirection,
            ],
            'products' => $products,
        ]);
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
