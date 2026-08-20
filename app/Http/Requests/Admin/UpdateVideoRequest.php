<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVideoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:150'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'video_url' => ['required', 'url', 'regex:/(youtube\.com|youtu\.be|instagram\.com)/i'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a title for the video.',
            'thumbnail.image' => 'Please upload a valid image file (JPG, PNG or WEBP).',
            'thumbnail.max' => 'Thumbnail size should be under 2 MB.',
            'video_url.required' => 'Please enter the video link.',
            'video_url.url' => 'Please enter a valid link.',
            'video_url.regex' => 'Please enter a valid YouTube or Instagram link.',
        ];
    }
}
