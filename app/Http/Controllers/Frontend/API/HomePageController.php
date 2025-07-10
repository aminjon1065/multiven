<?php

namespace App\Http\Controllers\Frontend\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Adverisement;
use App\Models\Blog;
use App\Models\Brand;
use App\Models\Category;
use App\Models\FlashSaleItem;
use App\Models\HomePageSetting;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class HomePageController extends Controller
{
    /**
     * Retrieves and returns all necessary data for the home page API endpoint.
     *
     * This method aggregates data from various sources, optimizing database
     * queries by fetching related records in single batches. It leverages
     * caching for data that does not change often.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function homePage(): JsonResponse
    {

        // --- Cached Data ---
        // Retrieve all categories from the cache, or from the database if not cached.
        $categories = Cache::remember('categories', 3600, static fn() => Category::all());

        // Retrieve active, featured brands. Consider caching this if it doesn't change often.
        $brands = Cache::remember('featured_brands', 3600, static fn() => Brand::where('status', 1)->where('is_featured', 1)->get());

        // --- Dynamic Data ---
        // Get an array of product IDs for active flash sale items shown on the home page.
        $flashSaleItems = FlashSaleItem::where('show_at_home', 1)->where('status', 1)->pluck('product_id')->toArray();

        // Get products grouped by type (e.g., new arrival, featured) via a helper method.
        $typeBaseProducts = $this->getTypeBaseProduct();

        // Fetch all required home page settings in a single query.
        // The keyBy('key') method makes it easy to access settings by their key name.
        $settingKeys = [
            'popular_category_section',
            'product_slider_section_one',
            'product_slider_section_two',
            'product_slider_section_three'
        ];
        $homePageSettings = HomePageSetting::whereIn('key', $settingKeys)->get()->keyBy('key');

        // Fetch all required banners in a single query.
        $bannerKeys = [
            'homepage_section_banner_one',
            'homepage_section_banner_two',
            'homepage_section_banner_three',
            'homepage_section_banner_four',
        ];
        $banners = Adverisement::whereIn('key', $bannerKeys)->get()->keyBy('key');

        // Fetch the 8 most recent, active blogs.
        $recentBlogs = Blog::with(['category', 'user'])->where('status', 1)->latest()->take(8)->get();

        // Construct and return the final JSON response.
        return response()->json([
            'categories' => CategoryResource::collection($categories),
            'flashSaleItems' => $flashSaleItems,
            'brands' => $brands,
            'recentBlogs' => $recentBlogs,
            'typeBaseProducts' => $typeBaseProducts,
            'popularCategory' => $homePageSettings->get('popular_category_section'),
            'categoryProductSliderSectionOne' => $homePageSettings->get('product_slider_section_one'),
            'categoryProductSliderSectionTwo' => $homePageSettings->get('product_slider_section_two'),
            'categoryProductSliderSectionThree' => $homePageSettings->get('product_slider_section_three'),
            // With model casting, you can access ->value directly. It will be a decoded array/object or null.
            'homepage_banner_one' => $banners->get('homepage_section_banner_one')?->value,
            'homepage_banner_two' => $banners->get('homepage_section_banner_two')?->value,
            'homepage_banner_three' => $banners->get('homepage_section_banner_three')?->value,
            'homepage_banner_four' => $banners->get('homepage_section_banner_four')?->value,
        ]);
    }

    /**
     * Retrieves products categorized by their type for the home page.
     *
     * @return array
     */
    public function getTypeBaseProduct(): array
    {
        $productTypes = ['new_arrival', 'featured_product', 'top_product', 'best_product'];
        $typeBaseProducts = [];

        // Loop through the product types to reduce code duplication.
        foreach ($productTypes as $type) {
            $typeBaseProducts[$type] = Product::withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->with(['variants', 'category', 'productImageGalleries'])
                ->where(['product_type' => $type, 'is_approved' => 1, 'status' => 1])
                ->latest() // A more readable alias for orderBy('id', 'DESC') on created_at
                ->take(8)
                ->get();
        }

        return $typeBaseProducts;
    }
}
