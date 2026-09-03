<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')
                ->nullable()
                ->constrained('products')
                ->nullOnDelete();
            $table->string('vehicle_model', 150); // snapshot of product name

            $table->string('full_name', 100);
            $table->string('phone', 15);
            $table->string('whatsapp', 15)->nullable();
            $table->date('vehicle_purchase_date')->nullable();

            $table->string('service_type', 50);
            $table->text('complaint');
            $table->date('preferred_date');
            $table->string('preferred_time', 50);

            $table->string('location_type', 20); // showroom / pickup_drop
            $table->text('address')->nullable();

            $table->string('status', 20)->default('new'); // new/contacted/completed/cancelled
            $table->boolean('admin_notified')->default(false);

            $table->timestamps();

            $table->index('status');
            $table->index('preferred_date');
            $table->index('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_bookings');
    }
};
