<?php

namespace App\Http\Requests\ChildCategory;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreChildCategoryRequest extends FormRequest
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
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'exists:sub_categories,id|nullable',
            'name' => 'required|string|max:255',
            'slug' => 'string|max:255',
            'status' => 'required|boolean',
        ];
    }
}
