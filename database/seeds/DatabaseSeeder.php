<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CategoriesSeeder::class);
        $this->call(CurrencySeeder::class);
        $this->call(MealsSeeder::class);
        $this->call(MealPricesSeeder::class);
        $this->call(SettingsSeeder::class);
    }
}
