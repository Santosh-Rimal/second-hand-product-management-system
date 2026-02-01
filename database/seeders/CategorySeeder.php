<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $categories = [
       ['name' => 'Electronics', 'description' => 'Electronic devices'],
       ['name' => 'Clothing', 'description' => 'Fashion and apparel'],
       ['name' => 'Books', 'description' => 'Books and magazines'],
       ['name' => 'Sports', 'description' => 'Sports accessories'],
       ['name' => 'Home & Kitchen', 'description' => 'Home appliances'],
       ['name' => 'Beauty', 'description' => 'Beauty products'],
       ['name' => 'Toys', 'description' => 'Kids toys'],
       ['name' => 'Furniture', 'description' => 'Home furniture'],
       ['name' => 'Groceries', 'description' => 'Daily groceries'],
       ['name' => 'Automobile', 'description' => 'Auto accessories'],
       ];

       Category::insert($categories);
       }
}