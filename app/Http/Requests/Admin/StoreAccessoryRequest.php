<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAccessoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:2000'],
            'image' => ['nullable', 'image', 'max:2048'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter an accessory name.',
            'description.max' => 'Description should be under 2000 characters.',
            'image.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'image.max' => 'Image size should be under 2 MB.',
        ];
    }
}
