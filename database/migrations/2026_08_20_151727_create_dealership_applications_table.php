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
        Schema::create('dealership_applications', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 100);
            $table->string('phone', 15);
            $table->string('pincode', 10);
            $table->string('area_available', 50);
            $table->string('investment', 50);
            $table->string('status', 20)->default('new');
            $table->boolean('admin_notified')->default(false);
            $table->timestamps();

            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dealership_applications');
    }
};
