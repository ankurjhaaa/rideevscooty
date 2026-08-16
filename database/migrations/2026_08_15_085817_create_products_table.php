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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->string('name', 150);
            $table->string('slug', 180)->unique();
            $table->decimal('price', 10, 2);
            $table->string('short_description', 255)->nullable();
            $table->text('description')->nullable();
            $table->string('motor_power', 50)->nullable();
            $table->string('top_speed', 50)->nullable();
            $table->string('range', 50)->nullable();
            $table->string('battery_capacity', 50)->nullable();
            $table->string('charging_time', 50)->nullable();
            $table->string('emi_info', 150)->nullable();

            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('sort_order')->default(0);

            $table->timestamps();
            $table->softDeletes();
            $table->index(['is_active', 'is_featured']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
