<?php

namespace App\Observers;

use App\Models\Product;
use App\Models\ProductView;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        //
    }

     public function retrieved(Product $product): void
     {
        $route = Route::current(); // Illuminate\Routing\Route
        // $name = Route::currentRouteName(); // string
        // $action = Route::currentRouteAction(); // string
        // dd($route->uri());
        // dd($name);
        // dd($action);
        // dd($product);
        if($route->uri==="product/details/{id}"){
            $user = Auth::user();
        if (!$user) return;

        $alreadyViewed = ProductView::where('product_id', $product->id)
            ->where('user_id', $user->id)
            ->exists();

        if (!$alreadyViewed) {
            $product->increment('views');
            ProductView::create([
                'product_id' => $product->id,
                'user_id' => $user->id,
            ]);
        }
        }
       
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}