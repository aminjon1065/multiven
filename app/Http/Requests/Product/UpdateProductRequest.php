<?php

namespace App\Http\Requests\Product;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'code' => ['required', 'string', 'unique:products,code'],
            'name' => ['required', 'string'],
            'slug' => ['required', 'string', 'unique:products,slug'],
            'thumb_image' => ['image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'],
            'vendor_id' => ['required', 'exists:vendors,id'],
            'category_id' => ['required', 'exists:categories,id'],
            'sub_category_id' => ['nullable', 'exists:sub_categories,id'],
            'child_category_id' => ['nullable', 'exists:child_categories,id'],
            'brand_id' => ['nullable', 'exists:brands,id'],
            'qty' => ['required', 'numeric'],
            'short_description' => ['required', 'string'],
            'long_description' => ['nullable', 'string'],
            'video_link' => ['nullable', 'string'],
            'link_source' => ['nullable', 'string'],
            'price' => ['required', 'numeric'],
            'cost_price' => ['required', 'numeric'],
            'offer_price' => ['nullable', 'numeric'],
            'offer_start_date' => ['nullable', 'date'],
            'offer_end_date' => ['nullable', 'date'],
            'product_type' => ['nullable', 'string'],
            'status' => ['required', 'boolean'],
            'is_approved' => ['boolean'],
            'seo_title' => ['nullable', 'string'],
            'seo_description' => ['nullable', 'string']
        ];
    }
}
