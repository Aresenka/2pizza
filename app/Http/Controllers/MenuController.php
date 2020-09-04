<?php

namespace App\Http\Controllers;

use App\Meal;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index($id = 0)
    {
        $meals = Meal::with([
            'mealPrices' => function ($query) {
                $query->select('currency_id', 'meal_price', 'meal_id');
            }
        ])
            ->where('deleted_at', null)
            ->where(function ($query) use ($id) {
                if ($id && $id > 0) {
                    $query->where('category_id', $id);
                }
            })
            ->orderBy('category_id', 'asc')
            ->orderBy('id', 'asc')
            ->get();
        return $meals->toJson();
    }

    public function getItem($id)
    {
        $meal = Meal::with([
            'mealPrices' => function ($query) {
                $query->select('currency_id', 'meal_price', 'meal_id');
            }
        ])
            ->where('id', $id)
            ->first();
        return $meal->toJson();
    }
}
