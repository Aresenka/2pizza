<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    public $timestamps = false;

    protected $fillable = ['order_id', 'meal_id', 'meals_count'];
}
