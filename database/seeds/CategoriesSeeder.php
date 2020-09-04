<?php

use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('meal_categories')->insert([
            [
                'meal_cat_title' => 'Pizza',
            ],
            [
                'meal_cat_title' => 'Drinks',
            ]
        ]);
    }
}
