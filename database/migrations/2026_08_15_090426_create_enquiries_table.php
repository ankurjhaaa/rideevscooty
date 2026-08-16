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
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')
                ->nullable()
                ->constrained('products')
                ->nullOnDelete();
            $table->string('product_name', 150); // snapshot

            $table->foreignId('color_id')
                ->nullable()
                ->constrained('product_colors')
                ->nullOnDelete();
            $table->string('color_name', 50)->nullable(); // snapshot

            $table->string('full_name', 100);
            $table->string('phone', 15);
            $table->string('email', 150)->nullable();
            $table->string('pincode', 10);

            $table->string('mode', 20); // home / dealer
            $table->date('preferred_date');
            $table->string('time_slot', 50);
            $table->text('message')->nullable();

            $table->string('status', 20)->default('new'); // new/contacted/completed/cancelled
            $table->boolean('admin_notified')->default(false);

            $table->timestamps();

            $table->index('status');
            $table->index('created_at');
            $table->index('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
