<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DealershipApplication extends Model
{
    protected $fillable = [
        'full_name', 'phone', 'pincode', 'area_available', 'investment',
        'status', 'admin_notified',
    ];

    protected function casts(): array
    {
        return [
            'admin_notified' => 'boolean',
        ];
    }
}
