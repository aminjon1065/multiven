<?php

namespace App\Http\Requests\Product\ProductVariant\ProductVariantItem;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductVariantItemRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'                => ['required','string'],
            'price'               => ['nullable','numeric'],
            'product_variant_id'  => ['required','integer','exists:product_variants,id'],
            'status'              => ['required','boolean'],
            'is_default'          => ['required','boolean'],
        ];
    }
}
