<?php

namespace App\Models;

use App\Http\Controllers\ServiceBookingController;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceBooking extends Model
{
    protected $fillable = [
        'product_id', 'vehicle_model',
        'full_name', 'phone', 'whatsapp',
        'vehicle_purchase_date',
        'service_type', 'complaint',
        'preferred_date', 'preferred_time',
        'location_type', 'address',
        'status', 'admin_notified',
    ];

    protected $appends = ['service_type_label'];

    protected function casts(): array
    {
        return [
            'vehicle_purchase_date' => 'date',
            'preferred_date' => 'date',
            'admin_notified' => 'boolean',
            'total_visits' => 'integer',
        ];
    }

    protected function serviceTypeLabel(): Attribute
    {
        return Attribute::make(
            get: fn () => ServiceBookingController::SERVICE_TYPES[$this->service_type] ?? $this->service_type,
        );
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
