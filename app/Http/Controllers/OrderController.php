<?php

namespace App\Http\Controllers;

use App\Order;
use App\OrderItems;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Create new order and link all order items to it
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        //Validate request data
        $data = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'items' => 'required',
            'total' => 'required',
            'currency' => 'required'
        ]);

        //Create new order
        $order = Order::create([
            'order_client_name' => $data['name'],
            'order_client_phone' => $data['phone'],
            'order_client_address' => $data['address'],
            'order_status' => 'new',
            'order_total' => $data['total'],
            'currency_id' => $data['currency']
        ]);

        //Create links between order items and new order
        foreach ($data['items'] as $item) {
            OrderItems::create([
                'order_id' => $order->id,
                'meal_id' => $item['id'],
                'meals_count' => $item['count']
            ]);
        }

        return response()->json('Order created!');
    }

    /**
     * Return all orders ordered by order_status DESC so new orders will be at the top
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Update order
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        //Validate request data
        $data = $request->validate([
            'id' => 'required',
            'status' => 'required',
            'comment' => 'string|nullable'
        ]);

        //Find order and update it status and comment values
        $order = Order::find($data['id']);
        $order->order_status = $data['status'];
        $order->order_comment = $data['comment'];
        $order->save();

        return response()->json('Order updated!');
    }
}
