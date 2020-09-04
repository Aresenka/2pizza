<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderItems;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function add(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'items' => 'required',
            'total' => 'required',
            'currency' => 'required'
        ]);

        $order = Order::create([
            'order_client_name' => $data['name'],
            'order_client_phone' => $data['phone'],
            'order_client_address' => $data['address'],
            'order_status' => 'new',
            'order_total' => $data['total'],
            'currency_id' => $data['currency']
        ]);

        foreach($data['items'] as $item){
            OrderItems::create([
                'order_id' => $order->id,
                'meal_id' => $item['id'],
                'meals_count' => $item['count']
            ]);
        }

        return response()->json('Order created!');
    }
}
