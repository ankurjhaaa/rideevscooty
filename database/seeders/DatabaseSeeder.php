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
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'RideEV Admin',
                'password' => 'Sikanderpur@-12345', // Will be hashed via User model casts
            ]
        );

        // 2. Create Default Site Settings
        SiteSetting::truncate();
        SiteSetting::create([
            'phone' => '9288018887',
            'whatsapp' => '9288018887',
            'email' => 'rideev6@gmail.com',
            'address' => 'Purani Bazar near old adhar sewa kender opposite central bank of India muzaffarpur Bihar pin:- 842001',
            'instagram_url' => 'https://www.instagram.com/rideev_official?igsi=cHAzczdiOWMwM3E0',
            'youtube_url' => 'https://www.youtube.com/@RideEv',
        ]);

        // 3. Create Category
        Category::truncate();
        $category = Category::create([
            'name' => 'Electric Two Wheeler',
            'slug' => Str::slug('Electric Two Wheeler'),
            'description' => 'Ride EV Scooty brings you a new generation of electric scooty designed for comfortable, economical and eco-friendly commuting. With modern styling, smooth performance, low running costs, Non RTO, No Registration, and Easy maintenance.',
            'is_active' => true,
        ]);

        // 4. Create Products
        Product::truncate();
        ProductColor::truncate();
        
        $productsData = [
            [
                'name' => 'Ride EV BMW',
                'price' => 77900,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'motor_power' => '1200W BLDC Hub Motor',
                'range' => 'UPTO 130 KM',
                'battery_capacity' => '48V 30Ah Lithium-ion',
                'charging_time' => '4-5 hours',
                'emi_info' => 'Starting at Rs. 2,499/month',
                'is_featured' => true,
                'colors' => ['Matte Black', 'White', 'Green', 'Silver']
            ],
            [
                'name' => 'RIDE EV PRIME',
                'price' => 63999,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue', 'Yellow', 'Red']
            ],
            [
                'name' => 'RIDE EV PRIME PRO',
                'price' => 66999,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue', 'Yellow', 'Red']
            ],
            [
                'name' => 'RIDE EV TANK',
                'price' => 98999,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 130 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Silver', 'Blue']
            ],
            [
                'name' => 'RIDE EV COMFORT',
                'price' => 70900,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue', 'Yellow', 'Red']
            ],
            [
                'name' => 'RIDE EV COMFORT PRO',
                'price' => 75900,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue', 'Yellow', 'Red']
            ],
            [
                'name' => 'RIDE EV NEO',
                'price' => 50000,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Front Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue', 'Yellow', 'Red']
            ],
            [
                'name' => 'RIDE EV PHANTAM',
                'price' => 72000,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Silver', 'Blue']
            ],
            [
                'name' => 'RIDE EV Q+',
                'price' => 73900,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue']
            ],
            [
                'name' => 'RIDE EV SPARK',
                'price' => 80000, // Replaced 8XXXX
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue']
            ],
            [
                'name' => 'RIDE EV STROM',
                'price' => 70000, // Replaced 7XXXX
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue']
            ],
            [
                'name' => 'RIDE EV DRAGSTER',
                'price' => 77900,
                'short_description' => 'Ride EV Scooty is a stylish, eco-friendly electric scooter designed for smooth, comfortable, and economical everyday commuting. It offers easy handling, low running costs, and zero-emission travel—perfect for city rides.',
                'description' => 'Tube less Tyre, Dual Disk, LED Lights, Fully Digital Meter, Mobile Charging Port, Anti Theft Alarm, LFP Battery 2+2 Years ETC.',
                'range' => 'UPTO 80 KM',
                'is_featured' => false,
                'colors' => ['Black', 'White', 'Green', 'Silver', 'Blue']
            ],
        ];

        // 5. Seed Images
        Storage::disk('public')->makeDirectory('products');
        ProductImage::truncate();

        // The image provided by the user
        $mainImageName = 'image_product.png';
        $sourcePath = public_path('images/' . $mainImageName);

        foreach ($productsData as $data) {
            $colors = $data['colors'];
            unset($data['colors']);
            
            $data['category_id'] = $category->id;
            $data['slug'] = Str::slug($data['name']);
            $data['is_active'] = true;
            
            $product = Product::create($data);

            // Add colors
            foreach ($colors as $color) {
                ProductColor::create([
                    'product_id' => $product->id,
                    'name' => trim($color),
                    'hex_code' => '#000000', // Default hex code
                    'is_active' => true,
                ]);
            }

            // Add the main image if it exists
            if (file_exists($sourcePath)) {
                $uniqueImageName = $product->id . '_' . $mainImageName;
                $destinationPath = 'products/' . $uniqueImageName;
                
                Storage::disk('public')->put(
                    $destinationPath,
                    file_get_contents($sourcePath)
                );

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $destinationPath,
                    'type' => 'main',
                    'is_primary' => true,
                    'sort_order' => 1,
                ]);
            }
        }
    }
}
