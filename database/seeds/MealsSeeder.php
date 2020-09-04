<?php

use Illuminate\Database\Seeder;

class MealsSeeder extends Seeder
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
                'meal_title' => 'Pepperoni',
                'meal_pic' => 'pepperoni.jpg ',
                'meal_desc' => 'Delicious pepperoni pizza!',
                'category_id' => 1,
            ],
            [
                'meal_title' => 'Margherita',
                'meal_pic' => 'margherita.jpg',
                'meal_desc' => 'Classic mozzarella and tomato sauce!',
                'category_id' => 1,
            ],
            [
                'meal_title' => 'Hawaiian',
                'meal_pic' => 'hawaiian.jpg',
                'meal_desc' => 'Sweet pineapples and tasty ham!',
                'category_id' => 1,
            ],
            [
                'meal_title' => 'Still water',
                'meal_pic' => 'still_water.jpg',
                'meal_desc' => 'Simple water without sparkles.',
                'category_id' => 2,
            ],
            [
                'meal_title' => 'Sparkling water',
                'meal_pic' => 'sparkling_water.jpg',
                'meal_desc' => 'Same water, but with a bit of sparkles.',
                'category_id' => 2,
            ],
        ]);
    }
}
