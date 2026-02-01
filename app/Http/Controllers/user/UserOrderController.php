<?php

namespace App\Http\Controllers\user;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserOrderController extends Controller
{
    public function userorders()
    {
        // $data=Order::recent(30)->with(['orderitems.product','user'])->where('user_id',Auth::id())->get();
        // return response()->json($data);
          return Inertia::render('user/orders/index',[
          'orders'=>Order::recent(30)->with(['orderitems.product','user'])->where('user_id',Auth::id())->get(),
          ]);
    }

    public function userorderdetails($uuid)
    {
        return Inertia::render('user/orders/details',[
        'ordersdetails'=>Order::with(['orderitems.product','user'])->where('transactionuuid',$uuid)->where('user_id',Auth::id())->first(),
        ]);
    }

    public function usercompletedorders()
    {
        return Inertia::render('user/orders/completedorders',[
        'orders'=>Order::with(['orderitems.product','user'])->where('status','COMPLETE')->where('user_id',Auth::id())->latest()->get(),
        ]);
    }

    public function userpendingorders()
    {
        return Inertia::render('user/orders/pendingorders',[
        'orders'=>Order::with(['orderitems.product','user'])->where('status','pending')->where('user_id',Auth::id())->get(),
        ]);
    }

    public function userallgorders()
    {
        return Inertia::render('user/orders/allorders',[
        'orders'=>Order::with(['orderitems.product','user'])->where('user_id',Auth::id())->get(),
        ]);
    }
}