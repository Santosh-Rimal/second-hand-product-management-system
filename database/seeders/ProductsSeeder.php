<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        // Use the exact image paths from your database
        $imagePaths = [
            "products/KcFiHshnsTDxlBGf6TWGqLAfV94KTs7DB56VzZuY.png",
            "products/atI7AYNW0l2c0f5a9y5tu43pDXRsRkHAROONlvkX.png",
            "products/ncPIzjkbE5lDdUGhRv8gqqkDdGxOuKROcm6uUmLM.png",
            "products/JqfHcA0CwZDrarcjCuwZrSErBWqz9oCf4qFiopyr.png",
            "products/Ua1anFLNKbhJBdZcv55CrtSjY3KTpWg59EEhvlVT.png",
            "products/nMNFOs4NXDPMNecWcXdlL4ZSOIOoQnFLDis0Efp3.png"
        ];

        // Define realistic product names and descriptions for each category
        $productsByCategory = [
            'Electronics' => [
                ['name' => 'Wireless Bluetooth Headphones', 'price' => 2999, 'quantity' => 50],
                ['name' => 'Smartphone Pro Max', 'price' => 8999, 'quantity' => 25],
                ['name' => 'Gaming Laptop RTX 4060', 'price' => 12999, 'quantity' => 15],
                ['name' => 'Smart Watch Series 8', 'price' => 4599, 'quantity' => 80],
                ['name' => 'Wireless Earbuds Pro', 'price' => 1999, 'quantity' => 120],
                ['name' => '4K Ultra HD Smart TV 55"', 'price' => 4999, 'quantity' => 30],
                ['name' => 'Digital Camera DSLR', 'price' => 3999, 'quantity' => 40],
                ['name' => 'Mechanical Keyboard', 'price' => 1299, 'quantity' => 100],
                ['name' => 'Portable Bluetooth Speaker', 'price' => 2499, 'quantity' => 60],
                ['name' => 'Tablet 10.5" 128GB', 'price' => 3499, 'quantity' => 45],
                ['name' => 'Wireless Charging Pad', 'price' => 799, 'quantity' => 150],
                ['name' => 'Noise Cancelling Headphones', 'price' => 3599, 'quantity' => 70],
                ['name' => 'Gaming Mouse RGB', 'price' => 899, 'quantity' => 200],
                ['name' => 'External SSD 1TB', 'price' => 4999, 'quantity' => 90],
                ['name' => 'Smart Home Hub', 'price' => 2999, 'quantity' => 60],
            ],
            'Clothing' => [
                ['name' => 'Premium Cotton T-Shirt', 'price' => 799, 'quantity' => 200],
                ['name' => 'Slim Fit Denim Jeans', 'price' => 1999, 'quantity' => 150],
                ['name' => 'Winter Jacket Hooded', 'price' => 3999, 'quantity' => 80],
                ['name' => 'Running Shoes Air', 'price' => 2999, 'quantity' => 100],
                ['name' => 'Formal Dress Shirt', 'price' => 1499, 'quantity' => 180],
                ['name' => 'Hoodie Sweatshirt', 'price' => 1299, 'quantity' => 120],
                ['name' => 'Leather Jacket', 'price' => 5999, 'quantity' => 40],
                ['name' => 'Casual Sneakers', 'price' => 2199, 'quantity' => 90],
                ['name' => 'Wool Sweater', 'price' => 1799, 'quantity' => 110],
                ['name' => 'Yoga Pants', 'price' => 999, 'quantity' => 160],
                ['name' => 'Summer Dress', 'price' => 1599, 'quantity' => 85],
                ['name' => 'Polo Shirt', 'price' => 899, 'quantity' => 140],
                ['name' => 'Winter Gloves', 'price' => 499, 'quantity' => 220],
                ['name' => 'Baseball Cap', 'price' => 399, 'quantity' => 180],
                ['name' => 'Swim Trunks', 'price' => 699, 'quantity' => 120],
            ],
            'Books' => [
                ['name' => 'Web Development Guide 2024', 'price' => 1299, 'quantity' => 150],
                ['name' => 'Python Programming Basics', 'price' => 899, 'quantity' => 200],
                ['name' => 'Business Strategy Book', 'price' => 1599, 'quantity' => 100],
                ['name' => 'Healthy Cooking Recipes', 'price' => 699, 'quantity' => 180],
                ['name' => 'Science Fiction Novel', 'price' => 599, 'quantity' => 250],
                ['name' => 'History of Civilization', 'price' => 1999, 'quantity' => 80],
                ['name' => 'Personal Finance Guide', 'price' => 1199, 'quantity' => 130],
                ['name' => 'Photography Masterclass', 'price' => 2499, 'quantity' => 70],
                ['name' => 'Children\'s Storybook', 'price' => 399, 'quantity' => 300],
                ['name' => 'Self-Help Psychology', 'price' => 999, 'quantity' => 160],
                ['name' => 'Cookbook International', 'price' => 1499, 'quantity' => 110],
                ['name' => 'Travel Guide Europe', 'price' => 799, 'quantity' => 140],
                ['name' => 'Poetry Collection', 'price' => 499, 'quantity' => 180],
                ['name' => 'Business Management', 'price' => 1799, 'quantity' => 95],
                ['name' => 'Graphic Design Basics', 'price' => 2199, 'quantity' => 75],
            ],
            'Home & Garden' => [
                ['name' => 'Ceramic Dinner Set 20pc', 'price' => 2499, 'quantity' => 80],
                ['name' => 'Garden Tools Set', 'price' => 1599, 'quantity' => 120],
                ['name' => 'Indoor Plants Set', 'price' => 1299, 'quantity' => 200],
                ['name' => 'Kitchen Knife Set', 'price' => 1999, 'quantity' => 90],
                ['name' => 'LED Desk Lamp', 'price' => 899, 'quantity' => 150],
                ['name' => 'Cookware Set 10pc', 'price' => 2999, 'quantity' => 60],
                ['name' => 'Bedding Set Queen', 'price' => 1799, 'quantity' => 110],
                ['name' => 'Vacuum Cleaner', 'price' => 3999, 'quantity' => 50],
                ['name' => 'Lawn Mower Electric', 'price' => 5999, 'quantity' => 30],
                ['name' => 'Wall Art Painting', 'price' => 1499, 'quantity' => 85],
                ['name' => 'Bathroom Accessories', 'price' => 999, 'quantity' => 140],
                ['name' => 'Outdoor Furniture Set', 'price' => 8999, 'quantity' => 25],
                ['name' => 'Air Purifier', 'price' => 3499, 'quantity' => 70],
                ['name' => 'Coffee Maker', 'price' => 2199, 'quantity' => 100],
                ['name' => 'Cushion Set 4pc', 'price' => 699, 'quantity' => 180],
            ],
            'Sports' => [
                ['name' => 'Yoga Mat Premium', 'price' => 699, 'quantity' => 180],
                ['name' => 'Adjustable Dumbbell Set', 'price' => 2999, 'quantity' => 100],
                ['name' => 'Football Size 5', 'price' => 1199, 'quantity' => 200],
                ['name' => 'Tennis Racket Pro', 'price' => 2499, 'quantity' => 80],
                ['name' => 'Camping Tent 4 Person', 'price' => 3999, 'quantity' => 60],
                ['name' => 'Fitness Tracker Watch', 'price' => 1999, 'quantity' => 150],
                ['name' => 'Basketball Official', 'price' => 899, 'quantity' => 160],
                ['name' => 'Golf Club Set', 'price' => 7999, 'quantity' => 40],
                ['name' => 'Boxing Gloves', 'price' => 1299, 'quantity' => 120],
                ['name' => 'Swimming Goggles', 'price' => 499, 'quantity' => 220],
                ['name' => 'Resistance Bands Set', 'price' => 799, 'quantity' => 180],
                ['name' => 'Cycling Helmet', 'price' => 1499, 'quantity' => 110],
                ['name' => 'Badminton Set', 'price' => 999, 'quantity' => 140],
                ['name' => 'Jump Rope', 'price' => 299, 'quantity' => 250],
                ['name' => 'Water Bottle 1L', 'price' => 399, 'quantity' => 200],
            ],
            'Beauty' => [
                ['name' => 'Skincare Serum Set', 'price' => 1999, 'quantity' => 120],
                ['name' => 'Makeup Kit Professional', 'price' => 2999, 'quantity' => 80],
                ['name' => 'Premium Perfume 100ml', 'price' => 3499, 'quantity' => 90],
                ['name' => 'Hair Care Shampoo Set', 'price' => 1299, 'quantity' => 150],
                ['name' => 'Body Lotion Collection', 'price' => 899, 'quantity' => 200],
                ['name' => 'Nail Polish Set 12 Colors', 'price' => 699, 'quantity' => 180],
                ['name' => 'Makeup Brushes Set', 'price' => 999, 'quantity' => 160],
                ['name' => 'Men\'s Grooming Kit', 'price' => 1499, 'quantity' => 140],
                ['name' => 'Face Mask Pack 10pc', 'price' => 599, 'quantity' => 220],
                ['name' => 'Lipstick Collection Set', 'price' => 1799, 'quantity' => 110],
                ['name' => 'Eye Shadow Palette', 'price' => 1299, 'quantity' => 130],
                ['name' => 'Sunscreen SPF 50', 'price' => 799, 'quantity' => 190],
                ['name' => 'Hair Styler Tools', 'price' => 2199, 'quantity' => 85],
                ['name' => 'Bath Salt Collection', 'price' => 499, 'quantity' => 210],
                ['name' => 'Facial Cleanser', 'price' => 699, 'quantity' => 170],
            ],
            'Toys' => [
                ['name' => 'Action Figure Collection', 'price' => 999, 'quantity' => 150],
                ['name' => 'Building Blocks Set 1000pc', 'price' => 1499, 'quantity' => 120],
                ['name' => 'Doll House with Furniture', 'price' => 2999, 'quantity' => 70],
                ['name' => 'Educational Learning Toy', 'price' => 899, 'quantity' => 180],
                ['name' => 'Jigsaw Puzzle 1000 Pieces', 'price' => 699, 'quantity' => 160],
                ['name' => 'Board Game Family Pack', 'price' => 1299, 'quantity' => 130],
                ['name' => 'Remote Control Car', 'price' => 1599, 'quantity' => 110],
                ['name' => 'Stuffed Animal Bear', 'price' => 499, 'quantity' => 220],
                ['name' => 'Play Kitchen Set', 'price' => 2499, 'quantity' => 85],
                ['name' => 'Science Experiment Kit', 'price' => 1799, 'quantity' => 95],
                ['name' => 'Musical Instrument Set', 'price' => 1399, 'quantity' => 125],
                ['name' => 'Toy Train Set', 'price' => 1999, 'quantity' => 90],
                ['name' => 'Water Gun Super Soaker', 'price' => 599, 'quantity' => 170],
                ['name' => 'Building Robot Kit', 'price' => 2299, 'quantity' => 80],
                ['name' => 'Art & Craft Supplies', 'price' => 799, 'quantity' => 190],
            ],
            'Automotive' => [
                ['name' => 'Car Wash Kit Complete', 'price' => 1999, 'quantity' => 110],
                ['name' => 'Tool Set 150 Pieces', 'price' => 2999, 'quantity' => 85],
                ['name' => 'Car Floor Mats Set', 'price' => 1499, 'quantity' => 140],
                ['name' => 'Wax & Polish Kit', 'price' => 999, 'quantity' => 160],
                ['name' => 'Car Phone Holder', 'price' => 399, 'quantity' => 220],
                ['name' => 'Jump Starter Power Bank', 'price' => 2499, 'quantity' => 90],
                ['name' => 'Car Vacuum Cleaner', 'price' => 1799, 'quantity' => 120],
                ['name' => 'LED Headlight Bulbs', 'price' => 1299, 'quantity' => 150],
                ['name' => 'Car Seat Covers Set', 'price' => 3499, 'quantity' => 75],
                ['name' => 'Emergency Roadside Kit', 'price' => 1599, 'quantity' => 100],
                ['name' => 'Car Air Freshener Pack', 'price' => 299, 'quantity' => 250],
                ['name' => 'Tire Pressure Gauge', 'price' => 499, 'quantity' => 180],
                ['name' => 'Car Trunk Organizer', 'price' => 899, 'quantity' => 130],
                ['name' => 'Window Sun Shade', 'price' => 599, 'quantity' => 170],
                ['name' => 'Car Battery Charger', 'price' => 2199, 'quantity' => 95],
            ],
        ];

        foreach ($categories as $category) {
            $categoryName = $category->name;
            
            // Get predefined products for this category or create generic ones
            $products = $productsByCategory[$categoryName] ?? [];
            
            if (!empty($products)) {
                foreach ($products as $productData) {
                    // Randomly select 2-4 images for each product from your provided paths
                    $imageCount = rand(2, 4);
                    $selectedImages = [];
                    
                    // Shuffle and pick random images
                    shuffle($imagePaths);
                    for ($j = 0; $j < $imageCount; $j++) {
                        $selectedImages[] = $imagePaths[$j];
                    }
                    
                    Product::create([
                        'name' => $productData['name'],
                        'quantity' => $productData['quantity'],
                        'is_active' => true,
                        'seller_id' => rand(1, 2),
                        'description' => "High-quality {$productData['name']} with excellent features and durability. Perfect for everyday use and built to last.",
                        'price' => $productData['price'],
                        'images' => json_encode($selectedImages),
                        'category_id' => $category->id,
                    ]);
                }
            } else {
                // Create generic products if category not in predefined list
                for ($i = 1; $i <= 15; $i++) {
                    // Randomly select 2-4 images for each product from your provided paths
                    $imageCount = rand(2, 4);
                    $selectedImages = [];
                    
                    // Shuffle and pick random images
                    shuffle($imagePaths);
                    for ($j = 0; $j < $imageCount; $j++) {
                        $selectedImages[] = $imagePaths[$j];
                    }
                    
                    Product::create([
                        'name' => $categoryName . " Product $i",
                        'quantity' => rand(10, 100),
                        'is_active' => true,
                        'seller_id' => rand(1, 2),
                        'description' => "Premium quality {$categoryName} product with excellent features and performance. Made from high-quality materials for durability.",
                        'price' => rand(500, 5000),
                        'images' => json_encode($selectedImages),
                        'category_id' => $category->id,
                    ]);
                }
            }
        }
    }
}