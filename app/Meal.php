<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $fillable = ['meal_title', 'meal_pic', 'meal_desc', 'category_id'];

    public function mealCategory()
    {
        return $this->hasOne(MealCategory::class);
    }

    public function mealPrices()
    {
        return $this->hasMany(MealPrice::class);
    }
}
