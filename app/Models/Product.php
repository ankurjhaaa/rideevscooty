<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category_id', 'name', 'slug', 'price',
        'short_description', 'description',
        'motor_power', 'top_speed', 'range', 'battery_capacity', 'charging_time', 'emi_info',
        'is_featured', 'is_active', 'sort_order',
    ];

    protected $appends = ['primary_image_url'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    protected function primaryImageUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                $image = $this->relationLoaded('images')
                    ? $this->images->sortByDesc('is_primary')->first()
                    : $this->images()->orderByDesc('is_primary')->orderBy('sort_order')->first();

                return $image ? Storage::disk('public')->url($image->image_path) : null;
            },
        );
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function colors(): HasMany
    {
        return $this->hasMany(ProductColor::class);
    }

    public function enquiries(): HasMany
    {
        return $this->hasMany(Enquiry::class);
    }
}
