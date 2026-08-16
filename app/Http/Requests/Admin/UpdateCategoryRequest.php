<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', Rule::unique('categories', 'name')->ignore($this->route('category'))],
            'slug' => ['nullable', 'string', 'max:120', 'alpha_dash', Rule::unique('categories', 'slug')->ignore($this->route('category'))],
            'description' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter a category name.',
            'name.unique' => 'A category with this name already exists.',
            'name.max' => 'Category name should be under 100 characters.',
            'slug.alpha_dash' => 'URL slug can only contain letters, numbers, hyphens and underscores.',
            'slug.unique' => 'This URL slug is already in use. Try a different one.',
            'description.max' => 'Description should be under 255 characters.',
            'image.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'image.max' => 'Image size should be under 2 MB.',
        ];
    }
}
