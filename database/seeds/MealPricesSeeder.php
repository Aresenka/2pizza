<?php

use Illuminate\Database\Seeder;

class MealPricesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meals')->insert([
            [
                'meal_id' => 1,
                'currency_id' => 1,
                'meal_price' => 7
            ],
            [
                'meal_id' => 1,
                'currency_id' => 2,
                'meal_price' => 5
            ],
            [
                'meal_id' => 2,
                'currency_id' => 1,
                'meal_price' => 5
            ],
            [
                'meal_id' => 2,
                'currency_id' => 2,
                'meal_price' => 3.5
            ],
            [
                'meal_id' => 3,
                'currency_id' => 1,
                'meal_price' => 10
            ],
            [
                'meal_id' => 3,
                'currency_id' => 2,
                'meal_price' => 7.99
            ],
            [
                'meal_id' => 4,
                'currency_id' => 1,
                'meal_price' => 0.5
            ],
            [
                'meal_id' => 4,
                'currency_id' => 2,
                'meal_price' => 0.35
            ],
            [
                'meal_id' => 5,
                'currency_id' => 1,
                'meal_price' => 0.5
            ],
            [
                'meal_id' => 5,
                'currency_id' => 2,
                'meal_price' => 0.35
            ]
        ]);
    }
}
