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
        'google_review_qr', 'google_review_url', 'instagram_qr',
    ];

    protected $appends = ['logo_url', 'google_review_qr_url', 'instagram_qr_url'];

    protected function logoUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->logo ? Storage::disk('public')->url($this->logo) : null,
        );
    }

    protected function googleReviewQrUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->google_review_qr ? Storage::disk('public')->url($this->google_review_qr) : null,
        );
    }

    protected function instagramQrUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->instagram_qr ? Storage::disk('public')->url($this->instagram_qr) : null,
        );
    }

    public static function current(): self
    {
        return static::first() ?? static::create([]);
    }
}
