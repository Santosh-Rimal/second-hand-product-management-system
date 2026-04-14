<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\frontend\CartController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    // return Product::with(['category', 'seller'])->limit(10)->get();
    $products = Product::with(['category', 'seller'])->withSum('orderItems as total_sold', 'quantity')->get();
    // dd($products->toArray());
    return Inertia::render('frontend/welcome', [
        'products' => $products,
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::get('/products', function () {
    return Inertia::render('frontend/products/products', [
        'categories'=>\App\Models\Category::get(),
        'products' => Product::with(['category', 'seller'])->withSum('orderItems as total_sold', 'quantity')->get(),
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('products');




Route::middleware('auth')->prefix('cart')->group(function () {

    Route::get('/', [CartController::class, 'index'])
        ->name('cart.index');

    Route::post('/add', [CartController::class, 'store'])
        ->name('cart.store');

    Route::post('/update', [CartController::class, 'update'])
        ->name('cart.update');

    Route::delete('/remove/{id}', [CartController::class, 'destroy'])
        ->name('cart.destroy');
});

Route::post('/checkout',[CheckoutController::class,'store'])->middleware('auth')->name('checkout');

Route::get('/contact',function(){
    return Inertia::render('frontend/contact');
})->name('contacts');


Route::get('/about',function(){
    return Inertia::render('frontend/about');
})->name('abouts');


Route::get('/product/details/{id}', function ($id) {
    // return Product::with(['category', 'seller'])->findOrFail($id);
    $product = Product::with(['category', 'seller'])->findOrFail($id); 
    return Inertia::render('frontend/products/detail', [
        'product' => $product,
    ]);
})->name('details');



Route::get('/search',[ProductController::class,'searchProduct'])->name('searchProduct');


Route::get('/signinform',[LoginController::class,'signinform'])->name('signinform');
Route::post('/signin',[LoginController::class,'signin'])->name('signin');
Route::post('/signup',[LoginController::class,'store'])->name('signup');



Route::get('/esewa/success', [CheckoutController::class, 'success'])->name('esewa.success');
Route::get('/esewa/failure', [CheckoutController::class, 'failure'])->name('esewa.failure');