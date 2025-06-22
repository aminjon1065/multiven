<?php

namespace App\Http\Requests\Product;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        $id = $this->route('product')->id;
        return [
            'code'             => ['sometimes', 'required', Rule::unique('products','code')->ignore($id)],
            'name'             => ['sometimes', 'required', 'string'],
            'thumb_image' => [
                'nullable',
                // берём правило «файл→изображение» только если реально загрузили файл
                \Illuminate\Validation\Rule::excludeIf(fn() => ! $this->hasFile('thumb_image')),
                'image',
                'mimes:jpeg,png,jpg,gif,svg,webp',
                'max:2048',
            ],
            'category_id'      => ['sometimes', 'required', 'exists:categories,id'],
            'sub_category_id'  => ['nullable', 'exists:sub_categories,id'],
            'child_category_id'=> ['nullable', 'exists:child_categories,id'],
            'brand_id'         => ['sometimes', 'required', 'exists:brands,id'],
            'qty'              => ['sometimes', 'required', 'numeric'],
            'short_description'=> ['sometimes', 'required', 'string'],
            'long_description' => ['nullable', 'string'],
            'video_link'       => ['nullable', 'url'],
            'link_source'      => ['nullable', 'url'],
            'price'            => ['sometimes', 'required', 'numeric'],
            'cost_price'       => ['sometimes', 'required', 'numeric'],
            'offer_price'      => ['nullable', 'numeric'],
            'offer_start_date' => ['nullable', 'date'],
            'offer_end_date'   => ['nullable', 'date', 'after_or_equal:offer_start_date'],
            'product_type'     => ['nullable', 'string'],
            'status'           => ['sometimes', 'required', 'boolean'],
            'is_approved'      => ['boolean'],
            'seo_title'        => ['nullable', 'string'],
            'seo_description'  => ['nullable', 'string'],
            'link_first'       => ['nullable', 'url'],
        ];
    }
}
