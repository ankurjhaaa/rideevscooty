<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enquiry extends Model
{
    protected $fillable = [
        'product_id', 'product_name',
        'color_id', 'color_name',
        'full_name', 'phone', 'email', 'pincode',
        'mode', 'preferred_date', 'time_slot', 'message',
        'status', 'admin_notified',
    ];

    protected function casts(): array
    {
        return [
            'preferred_date' => 'date',
            'admin_notified' => 'boolean',
        ];
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(ProductColor::class, 'color_id');
    }
}
