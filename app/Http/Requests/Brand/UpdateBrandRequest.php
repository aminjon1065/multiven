<?php

namespace App\Http\Requests\Brand;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBrandRequest extends FormRequest
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
            'logo' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048|nullable',
            'name' => 'string',
            'is_featured' => 'boolean',
            'status' => 'boolean',
        ];
    }
}
