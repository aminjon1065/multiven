<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\StoreBrandRequest;
use App\Http\Requests\Brand\UpdateBrandRequest;
use App\Models\Brand;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Str;

class BrandController extends Controller
{
    use ImageUploadTrait;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $brands = Brand::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            })
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();
        return Inertia::render('backend/brand/index', [
            'brands' => $brands,
            'filters' => [
                'search' => $search,
            ]
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
    public function store(StoreBrandRequest $request)
    {
        $validated = $request->validated();
        $logoPath = $this->uploadImage($request, 'logo', 'uploads/brands');
        $validated['slug'] = $validated['name'];
        $validated['logo'] = $logoPath;
        $brand = Brand::create($validated);
        if ($brand) {
            return back()->with(['success' => 'Успешно создано!']);
        }
        return back()->withErrors(['msg' => 'Ощибка при создание']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        dd(request()->all());
//        try {
//            $validated = $request->validated();
//            if (!isset($validated['name'])) {
//                return back()->withErrors(['msg' => 'Поле name не передано в запросе']);
//            }
//            $validated['slug'] = Str::slug($validated['name']);
//            // Если пришёл новый файл — загружаем
//            if ($request->hasFile('logo')) {
//                $validated['logo'] = $this->updateImage(
//                    $request,
//                    'logo',
//                    'uploads/brands',
//                    $brand->logo
//                );
//            } else {
//                unset($validated['logo']); // чтобы не затирать null или старый путь
//            }
//
//            $brand->update($validated);
//            return back()->with(['success' => 'Обновлено!']);
//        } catch (\Exception $exception) {
//            return back()->withErrors(['msg' => $exception->getMessage()]);
//        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        //
    }
}
