<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SiteSetting extends Model
{
    protected $fillable = [
        'logo', 'phone', 'whatsapp', 'email', 'address',
        'instagram_url', 'facebook_url', 'youtube_url',
        'latitude', 'longitude',
    ];

    protected $appends = ['logo_url'];

    protected function logoUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->logo ? Storage::disk('public')->url($this->logo) : null,
        );
    }

    public static function current(): self
    {
        return static::first() ?? static::create([]);
    }
}
