<?php

namespace App\Http\Controllers;

use App\Meal;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Get meal with category_id === $id
     * If $id === 0 or no $id passed it return all meals
     * Meals returned with its category, ordered by category_id and id
     *
     * @param int $id
     * @return string
     */
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
}
