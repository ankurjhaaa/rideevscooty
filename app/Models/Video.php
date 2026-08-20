<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    protected $fillable = [
        'title', 'thumbnail', 'video_url', 'is_active', 'sort_order',
    ];

    protected $appends = ['thumbnail_url', 'platform'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected function thumbnailUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->thumbnail ? Storage::disk('public')->url($this->thumbnail) : null,
        );
    }

    protected function platform(): Attribute
    {
        return Attribute::make(
            get: function () {
                $url = strtolower($this->video_url ?? '');

                if (str_contains($url, 'youtube.com') || str_contains($url, 'youtu.be')) {
                    return 'youtube';
                }

                if (str_contains($url, 'instagram.com')) {
                    return 'instagram';
                }

                return null;
            },
        );
    }
}
