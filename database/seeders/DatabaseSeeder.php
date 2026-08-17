<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductImage;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::factory()->create([
            'name' => 'RideEV Admin',
            'email' => 'admin@gmail.com',
            'password' => 'password',
        ]);

        // 2. Create Default Site Settings
        SiteSetting::create([
            'phone' => '+91 9876543210',
            'whatsapp' => '+91 9876543210',
            'email' => 'hello@rideevscooty.test',
            'address' => '123, EV Tech Park, Green City, 110001',
            'instagram_url' => 'https://instagram.com/rideevscooty',
            'facebook_url' => 'https://facebook.com/rideevscooty',
            'youtube_url' => 'https://youtube.com/rideevscooty',
        ]);

        // 3. Create Categories
        $categoryCity = Category::create([
            'name' => 'City Commute',
            'slug' => Str::slug('City Commute'),
            'description' => 'Perfect for daily office and city rides with comfort and high mileage.',
            'is_active' => true,
        ]);

        $categoryPower = Category::create([
            'name' => 'High Performance',
            'slug' => Str::slug('High Performance'),
            'description' => 'Built for thrill-seekers with top speed and fast acceleration.',
            'is_active' => true,
        ]);

        // 4. Create Products (Scooters)
        $scooter1 = Product::create([
            'category_id' => $categoryCity->id,
            'name' => 'EV Sprint',
            'slug' => Str::slug('EV Sprint'),
            'price' => 75000,
            'short_description' => 'The ultimate city rider with smart connectivity.',
            'description' => 'EV Sprint offers an unmatched riding experience for city commuters. It features a sleek design, comfortable seating, and smart app integration for tracking battery life and navigation.',
            'motor_power' => '1200W BLDC',
            'top_speed' => '45 km/h',
            'range' => '85 km',
            'battery_capacity' => '2.5 kWh Lithium-ion',
            'charging_time' => '4 Hours',
            'emi_info' => 'Starts at ₹2,500/month',
            'is_featured' => true,
            'is_active' => true,
        ]);

        ProductImage::create([
            'product_id' => $scooter1->id,
            'image_path' => 'https://placehold.co/800x600/e3e3e3/333333?text=EV+Sprint+Main',
            'type' => 'main',
            'is_primary' => true,
        ]);

        ProductImage::create([
            'product_id' => $scooter1->id,
            'image_path' => 'https://placehold.co/800x600/e3e3e3/333333?text=EV+Sprint+Side',
            'type' => 'side',
            'is_primary' => false,
        ]);

        ProductColor::create([
            'product_id' => $scooter1->id,
            'name' => 'Midnight Black',
            'hex_code' => '#111111',
            'is_active' => true,
        ]);
        ProductColor::create([
            'product_id' => $scooter1->id,
            'name' => 'Pearl White',
            'hex_code' => '#F8F9FA',
            'is_active' => true,
        ]);

        $scooter2 = Product::create([
            'category_id' => $categoryPower->id,
            'name' => 'EV Thunder',
            'slug' => Str::slug('EV Thunder'),
            'price' => 110000,
            'short_description' => 'Unleash the power with high speed and quick charge.',
            'description' => 'EV Thunder is designed for those who crave speed and performance. With a robust motor and an advanced battery management system, it delivers thrilling rides on open roads.',
            'motor_power' => '3000W BLDC',
            'top_speed' => '85 km/h',
            'range' => '120 km',
            'battery_capacity' => '3.5 kWh Lithium-ion',
            'charging_time' => '3 Hours (Fast Charge)',
            'emi_info' => 'Starts at ₹3,800/month',
            'is_featured' => true,
            'is_active' => true,
        ]);

        ProductImage::create([
            'product_id' => $scooter2->id,
            'image_path' => 'https://placehold.co/800x600/e3e3e3/333333?text=EV+Thunder+Main',
            'type' => 'main',
            'is_primary' => true,
        ]);

        ProductColor::create([
            'product_id' => $scooter2->id,
            'name' => 'Racing Red',
            'hex_code' => '#E63946',
            'is_active' => true,
        ]);
        ProductColor::create([
            'product_id' => $scooter2->id,
            'name' => 'Matte Grey',
            'hex_code' => '#6C757D',
            'is_active' => true,
        ]);
        
        $scooter3 = Product::create([
            'category_id' => $categoryCity->id,
            'name' => 'EV EcoLite',
            'slug' => Str::slug('EV EcoLite'),
            'price' => 55000,
            'short_description' => 'Lightweight, economical and eco-friendly.',
            'description' => 'EV EcoLite is a budget-friendly electric scooter ideal for short trips and students. It is incredibly lightweight, making it easy to maneuver in tight city traffic.',
            'motor_power' => '800W Hub Motor',
            'top_speed' => '25 km/h',
            'range' => '60 km',
            'battery_capacity' => '1.5 kWh Lead-acid',
            'charging_time' => '6 Hours',
            'emi_info' => 'Starts at ₹1,500/month',
            'is_featured' => false,
            'is_active' => true,
        ]);

        ProductImage::create([
            'product_id' => $scooter3->id,
            'image_path' => 'https://placehold.co/800x600/e3e3e3/333333?text=EV+EcoLite+Main',
            'type' => 'main',
            'is_primary' => true,
        ]);

        ProductColor::create([
            'product_id' => $scooter3->id,
            'name' => 'Sky Blue',
            'hex_code' => '#87CEEB',
            'is_active' => true,
        ]);

        // --- NEW DATA ADDED ---

        $categoryOffRoad = Category::create([
            'name' => 'Off-Road & Adventure',
            'slug' => Str::slug('Off-Road & Adventure'),
            'description' => 'Built tough for all terrains with extra suspension and durability.',
            'is_active' => true,
        ]);

        $categoryDelivery = Category::create([
            'name' => 'Delivery & Commercial',
            'slug' => Str::slug('Delivery & Commercial'),
            'description' => 'Heavy duty scooters with large cargo space for business needs.',
            'is_active' => true,
        ]);

        $scooter4 = Product::create([
            'category_id' => $categoryOffRoad->id,
            'name' => 'EV DirtRider',
            'slug' => Str::slug('EV DirtRider'),
            'price' => 135000,
            'short_description' => 'Conquer any terrain with advanced suspension.',
            'description' => 'EV DirtRider is your perfect companion for off-road adventures. It features dual shock absorbers, all-terrain tires, and a rugged frame.',
            'motor_power' => '4000W Peak',
            'top_speed' => '70 km/h',
            'range' => '90 km',
            'battery_capacity' => '3.0 kWh',
            'charging_time' => '5 Hours',
            'emi_info' => 'Starts at ₹4,200/month',
            'is_featured' => false,
            'is_active' => true,
        ]);
        // NOTE: No images added for EV DirtRider to demonstrate the new image placeholders!

        $scooter5 = Product::create([
            'category_id' => $categoryDelivery->id,
            'name' => 'EV CargoPro',
            'slug' => Str::slug('EV CargoPro'),
            'price' => 85000,
            'short_description' => 'Designed for heavy loads and long delivery shifts.',
            'description' => 'EV CargoPro offers maximum utility with a reinforced rear carrier, dual batteries for extended range, and low maintenance costs.',
            'motor_power' => '1500W Hub Motor',
            'top_speed' => '45 km/h',
            'range' => '140 km (Dual Battery)',
            'battery_capacity' => '4.0 kWh',
            'charging_time' => '6 Hours',
            'emi_info' => 'Starts at ₹2,800/month',
            'is_featured' => true,
            'is_active' => true,
        ]);

        ProductImage::create([
            'product_id' => $scooter5->id,
            'image_path' => 'https://placehold.co/800x600/e3e3e3/333333?text=EV+CargoPro',
            'type' => 'main',
            'is_primary' => true,
        ]);

        $scooter6 = Product::create([
            'category_id' => $categoryCity->id,
            'name' => 'EV Swift',
            'slug' => Str::slug('EV Swift'),
            'price' => 68000,
            'short_description' => 'Nimble and quick for everyday errands.',
            'description' => 'Get around the city swiftly with this compact and easy-to-handle electric scooter.',
            'motor_power' => '1000W BLDC',
            'top_speed' => '40 km/h',
            'range' => '75 km',
            'battery_capacity' => '2.0 kWh',
            'charging_time' => '4 Hours',
            'emi_info' => 'Starts at ₹2,100/month',
            'is_featured' => false,
            'is_active' => true,
        ]);
    }
}
