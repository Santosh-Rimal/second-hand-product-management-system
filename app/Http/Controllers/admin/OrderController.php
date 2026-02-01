<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function  orders()
    {
        // $orders=Order::with(['orderitems.product','user'])->get();
        // return response()->json($orders);
        return Inertia::render('admin/orders/index',[
            'orders'=>Order::with(['orderitems.product','user'])->get()
        ]);
    }

    public function details($uuid)
    {
        return Inertia::render('admin/orders/details',[
        'ordersdetails'=>Order::with(['orderitems.product','user'])->where('transactionuuid',$uuid)->first(),
        ]);
    }

    public function completedorders()
    {
        return Inertia::render('admin/orders/completedorders',[
        'orders'=>Order::with(['orderitems.product','user'])->where('status','COMPLETE')->get(),
        ]);
    }

    public function pendingorders()
    {
        return Inertia::render('admin/orders/pendingorders',[
        'orders'=>Order::with(['orderitems.product','user'])->where('status','pending')->get(),
        ]);
    }
}