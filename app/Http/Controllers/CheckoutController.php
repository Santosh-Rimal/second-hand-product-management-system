<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class CheckoutController extends Controller
{


   public function buynow(Request $request)
{
    // Find the product
    $product = Product::findOrFail($request->product_id);
    
    // Check if product is available
    if ($product->quantity < 1) {
        return back()->with('error', 'Product is out of stock.');
    }
    
    // Check if user is authenticated
    $user = Auth::user();
    if (!$user) {
        return redirect()->route('login')->with('error', 'Please login to continue.');
    }
    
    try {
        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $product->price,
            'status' => 'pending',
            'transactionuuid' => Str::uuid(),
        ]);
        
        // Create order item
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => 1,
            'price' => $product->price, // Use $product->price, not $order->product->price
        ]);
        
        // Optional: Reduce product quantity
        $product->decrement('quantity', 1);
        
        // Redirect to payment
        return $this->pay($order);
        
    } catch (\Exception $e) {
        // Log error and return with message
        Log::error('Buy Now Error: ' . $e->getMessage());
        return back()->with('error', 'Something went wrong. Please try again.');
    }
}
    


    public function store()
{
    $user = Auth::user();

    $cartItems = Cart::with('product')->where('user_id', $user->id)->get();
// return response()->json($cartItems);
    if ($cartItems->isEmpty()) {
        return response()->json(['message' => 'Cart is empty'], 400);
    }

    $order = Order::create([
        'user_id' => $user->id,
        'total_price' => 0,
        'status' => 'pending',
        'transactionuuid'=>Str::uuid(),
        
    ]);

    $total = 0;

    foreach ($cartItems as $item) {
        $subtotal = $item->product->price * $item->quantity;

        // Decrement stock with lock for concurrency
        Product::where('id', $item->product_id)
        ->where('quantity', '>=', $item->quantity)
        ->decrement('quantity', $item->quantity);
        
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $item->product_id,
            'quantity' => $item->quantity,
            'price' => $item->product->price,
        ]);
        $total += $subtotal;
    }

    $order->update(['total_price' => $total]);

    // Clear the cart after checkout
    Cart::where('user_id', $user->id)->delete();

   return $this->pay($order);
}

public function pay($order){
    $data = [
            'amount' => $order->total_price,
            'tax_amount' => 0,
            'total_amount' => $order->total_price,
            'transaction_uuid' => $order->transactionuuid,
            'product_code' => 'EPAYTEST',
            'product_service_charge' => 0,
            'product_delivery_charge' => 0,
            'success_url' => route('esewa.success'),
            'failure_url' => route('esewa.failure'),
        ];

        $signedFieldNames = 'total_amount,transaction_uuid,product_code';

        $message =
            "total_amount={$data['total_amount']}," .
            "transaction_uuid={$data['transaction_uuid']}," .
            "product_code={$data['product_code']}";

        $secretKey = '8gBm/:&EnhH.1/q';

        $signature = base64_encode(
            hash_hmac('sha256', $message, $secretKey, true)
        );
// dd($data);
        return Inertia::render('frontend/pay',[
            'data'=>$data,
            'signature'=>$signature,
            'signedFieldNames'=>$signedFieldNames
            
        ]);
}

public function success(Request $request)
    {
        $encodedData=$request->all();
        $decodedJson = base64_decode($encodedData['data']);
        $data = json_decode($decodedJson, true);
       Order::where('transactionuuid', $data['transaction_uuid'])
       ->update(['status' => 'COMPLETE']);
                
        return Inertia::render('frontend/success', [
        'payment' => $data,
        ]);
    }

    public function failure()
    {
    return Inertia::render('frontend/failure');
    }

}