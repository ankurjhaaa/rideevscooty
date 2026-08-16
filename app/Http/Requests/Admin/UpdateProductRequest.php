<?php

namespace App\Http\Requests\Admin;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:150', Rule::unique('products', 'name')->ignore($this->route('product'))],
            'slug' => ['nullable', 'string', 'max:180', 'alpha_dash', Rule::unique('products', 'slug')->ignore($this->route('product'))],
            'price' => ['required', 'numeric', 'min:0'],
            'short_description' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'motor_power' => ['nullable', 'string', 'max:50'],
            'top_speed' => ['nullable', 'string', 'max:50'],
            'range' => ['nullable', 'string', 'max:50'],
            'battery_capacity' => ['nullable', 'string', 'max:50'],
            'charging_time' => ['nullable', 'string', 'max:50'],
            'emi_info' => ['nullable', 'string', 'max:150'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],

            'images' => ['nullable', 'array'],
            'images.*.file' => ['required', 'image', 'max:2048'],
            'images.*.type' => ['nullable', 'string', 'max:30'],

            'colors' => ['nullable', 'array'],
            'colors.*.name' => ['required', 'string', 'max:50'],
            'colors.*.hex_code' => ['nullable', 'string', 'max:7'],
            'colors.*.image' => ['nullable', 'image', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'Selected category is not valid.',
            'name.required' => 'Please enter a product name.',
            'name.unique' => 'A product with this name already exists.',
            'price.required' => 'Please enter a price.',
            'price.numeric' => 'Price should be a valid number.',
            'price.min' => 'Price cannot be negative.',
            'slug.alpha_dash' => 'URL slug can only contain letters, numbers, hyphens and underscores.',
            'slug.unique' => 'This URL slug is already in use. Try a different one.',
            'images.*.file.required' => 'Please choose an image or remove this row.',
            'images.*.file.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'images.*.file.max' => 'Image size should be under 2 MB.',
            'colors.*.name.required' => 'Please enter a color name or remove this row.',
            'colors.*.image.image' => 'Please upload a valid image file for the color.',
            'colors.*.image.max' => 'Color image size should be under 2 MB.',
        ];
    }
}
