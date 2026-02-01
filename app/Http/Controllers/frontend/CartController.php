<?php

namespace App\Http\Controllers\frontend;

use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Show cart
    public function index()
    {
        $cartItems = Cart::where('user_id', Auth::id())
            ->with(['product','user'])
            ->get();

        //   return response()->json($cartItems);

        return Inertia::render('cart/cart', [
            'cartItems' => $cartItems
        ]);
    }

    // Add to cart
    public function store(Request $request)
    {
       $data= $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);
        $data['user_id']=Auth::id();
        // dd($data);
$cartExists=Cart::where('user_id',$data['user_id'])->where('product_id',$data['product_id'])->first();
        if($cartExists){
            return back()->with('error', 'Product already in the cart')->with('productId', $data['product_id']);
        }

        Cart::create($data);

        return back()->with('success', 'Product added to cart')->with('productId', $data['product_id']);
    }

    // Update quantity
    public function update(Request $request)
    {
        $data=$request->validate([
            'cart_id' => 'required|exists:carts,id',
            'quantity' => 'required|integer|min:1'
        ]);
    //    $data['user_id']=Auth::id();
    //     dd($data);   
        Cart::where('id', $request->cart_id)
            ->where('user_id', Auth::id())
            ->update(['quantity' => $request->quantity]);

        return back();
    }

    // Remove item
    public function destroy($id)
    {
        Cart::where('id', $id)
            ->where('user_id', Auth::id())
            ->delete();

        return back();
    }
}