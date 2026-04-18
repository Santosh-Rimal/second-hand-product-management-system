<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\Features;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $products = Product::with(['Category','seller'])->get();
        // return $products;
       return Inertia::render('admin/products/index', [
        'prooducts' => Inertia::scroll(fn () => Product::with(['Category','seller'])->paginate(10))
       ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::get();
        return Inertia::render('admin/products/products',['categories'=>$categories]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'images' => 'nullable|array',
            'category_id' => 'required|exists:categories,id',
        ]);
         
        // Handle file uploads
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
                }
                $validated['images'] = $imagePaths;
                }
                $validated['seller_id']=Auth::id();
        
        Product::create($validated);

        return redirect()->back()->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // return response()->json($product->load('category'));
        return Inertia::render('admin/products/show', [
            'product' => $product->load('category'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('admin/products/products', [
            'product' => $product,
            'categories' => $categories,
            'canEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'images' => 'nullable|array',
            'category_id' => 'required|exists:categories,id',
        ]);

        // delete old images if new images are uploaded
        if ($request->hasFile('images') && is_array($product->images)) {
            
            foreach ($product->images as $oldImage) {
                Storage::disk('public')->delete($oldImage);
            }   
        }

        // Handle file uploads
        if ($request->hasFile('images')) {
            $imagePaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $imagePaths[] = $path;
            }
            $validated['images'] = $imagePaths;
        }

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete associated images
        // dd($product->images);
        if (is_array($product->images)) {
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }




 public function searchProduct(Request $request)
{
    $target = strtolower(trim($request->input('query')));

    if (!$target) {
        return response()->json([
            'message' => 'No product name provided'
        ], 400);
    }

    // Load products with relations + total_sold
    $products = Product::with(['category', 'seller'])
        ->withSum('orderItems as total_sold', 'quantity')
        ->orderBy('name')
        ->get();

    // Extract lowercase names
    $productNames = $products->pluck('name')
        ->map(fn($name) => strtolower($name))
        ->toArray();

    // Binary search
    $index = $this->binarySearch($productNames, $target);

    if ($index !== -1) {

        $products = $products[$index];
        // Inertia response (ONLY if product found)
        return Inertia::render('frontend/search', [
            'products' => [$products],
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    return response()->json([
        'message' => 'Product not found'
    ], 404);
}
 private function binarySearch(array $array, string $target): int
 {
 $low = 0;
 $high = count($array) - 1;

 while ($low <= $high) { $mid=(int)(($low + $high) / 2); if ($array[$mid]===$target) { return $mid; } if ($array[$mid] <
     $target) { $low=$mid + 1; } else { $high=$mid - 1; } } return -1; }
     



}