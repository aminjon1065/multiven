<?php

namespace App\Http\Requests\Product;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'code' => ['required'],
            'name' => ['required', 'string'],
            'thumb_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
            'category_id' => ['required', 'exists:categories,id'],
            'sub_category_id' => ['nullable', 'exists:sub_categories,id'],
            'child_category_id' => ['nullable', 'exists:child_categories,id'],
            'brand_id' => ['required', 'exists:brands,id'],
            'qty' => ['required', 'numeric'],
            'short_description' => ['required', 'string'],
            'long_description' => ['required', 'string'],
            'video_link' => ['nullable', 'url'],
            'link_source' => ['nullable', 'url'],
            'price' => ['required', 'numeric'],
            'cost_price' => ['required', 'numeric'],
            'offer_price' => ['nullable', 'numeric'],
            'offer_start_date' => ['nullable', 'date'],
            'offer_end_date' => ['nullable', 'date', 'after_or_equal:offer_start_date'],
            'product_type' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
            'is_approved' => ['boolean'],
            'seo_title' => ['nullable', 'string'],
            'seo_description' => ['nullable', 'string']
        ];
    }
}
