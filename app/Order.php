<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_client_name', 'order_client_phone', 'order_client_address',
        'order_status', 'order_comment', 'order_total', 'currency_id'
    ];

    public function orderItems()
    {
        return $this
            ->belongsToMany(Meal::class, 'order_items', 'order_id', 'meal_id');
    }

    public function orderCurrency()
    {
        return $this->hasOne(Currency::class, 'id');
    }
}
