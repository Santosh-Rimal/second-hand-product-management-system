<?php

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\IsAdminMiddleware;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\admin\OrderController;
use App\Http\Controllers\user\UserOrderController;
use App\Http\Controllers\user\UserProductController;

Route::middleware(['auth', 'verified',IsAdminMiddleware::class])->group(function () {
    Route::get('admin-dashboard', function () {
        return Inertia::render('admin/admindashboard',[
            'totalproducts'=>Product::count(),
            'orders'=>Order::count(),
            'completeorders'=>Order::where('status','COMPLETE')->count(),
            'pendingorders'=>Order::where('status','pending')->count(),
            ]);
    })->name('dashboard');
});

Route::redirect('/dashboard', '/admin-dashboard', 301);
Route::post('/buynow',[CheckoutController::class,'buynow'])->middleware('auth') ->name('buynow');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('user-dashboard', function () {
        return Inertia::render('user/userdashboard',[
            'totalproducts'=>Product::where('seller_id',Auth::id())->count(),
            'orders'=>Order::where('user_id',Auth::id())->count(),
            'completeorders'=>Order::where('status','COMPLETE')->where('user_id',Auth::id())->count(),
            'pendingorders'=>Order::where('status','pending')->where('user_id',Auth::id())->count(),
        ]);
    })->name('userdashboard');

Route::get('user/orders',[UserOrderController::class,'userorders'])->name('userorders');
Route::get('user/orders/details/{uuid}',[UserOrderController::class,'userorderdetails'])->name('userorderdetails');
Route::get('user/orders/completed',[UserOrderController::class,'usercompletedorders'])->name('usercompletedorders');
Route::get('user/orders/pending',[UserOrderController::class,'userpendingorders'])->name('userpendingorders');
Route::get('user/orders/history',[UserOrderController::class,'userallgorders'])->name('userallgorders');
});



Route::prefix('admin')
    ->middleware(['auth', 'verified',IsAdminMiddleware::class])
    ->as('admin.')
    ->group(function () {
        Route::resource('products', ProductController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('users', UserController::class);
        Route::get('/orders',[OrderController::class,'orders'])->name('order');
        Route::get('/orders/details/{uuid}', [OrderController::class, 'details'])->name('ordersdetails');
        Route::get('/orders/completedorders', [OrderController::class, 'completedorders'])->name('completedorders');
        Route::get('/orders/pendingorders', [OrderController::class, 'pendingorders'])->name('pendingorders');
    });

Route::prefix('user')
    ->middleware(['auth', 'verified'])
    ->as('user.')
    ->group(function () {
        Route::resource('products', UserProductController::class);
    });


// Route::get('/users', function () {
// return Inertia::render('admin/products/hello', [
// 'products' => Inertia::scroll(fn () => Product::paginate(20))
// ]);
// });

require __DIR__.'/settings.php';
require __DIR__.'/frontend.php';