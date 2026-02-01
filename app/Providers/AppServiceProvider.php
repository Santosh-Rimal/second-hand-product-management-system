<?php

namespace App\Providers;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
        'appName' => config('app.name'),
        'hello'=>"hello",
        ]);
        
        Inertia::share([
        'totalCarts' => function () {
            // If user is logged in, count their carts
            return Auth::check() ? Cart::where('user_id', Auth::id())->count() : 0;
        },
    ]);
    }
}