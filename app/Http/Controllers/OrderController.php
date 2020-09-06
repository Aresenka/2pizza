<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderItems;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function add(Request $request)
    {
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

        foreach ($data['items'] as $item) {
            OrderItems::create([
                'order_id' => $order->id,
                'meal_id' => $item['id'],
                'meals_count' => $item['count']
            ]);
        }

        return response()->json('Order created!');
    }

    public function getOrders(Request $request)
    {
        $orders = Order::with([
                'orderItems' => function ($query) {
                    return $query->select('meals_count', 'meal_title');
                },
                'orderCurrency'
            ]
        )
            ->orderBy('order_status', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'id' => 'required',
            'status' => 'required',
            'comment' => 'string|nullable'
        ]);

        $order = Order::find($data['id']);
        $order->order_status = $data['status'];
        $order->order_comment = $data['comment'];
        $order->save();

        return response()->json('Order updated!');
    }
}
