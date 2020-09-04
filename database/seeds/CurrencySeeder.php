<?php

use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('currencies')->insert([
            [
                'currency_title' => 'US Dollar',
                'currency_code' => 'USD',
                'currency_symbol' => '$'
            ],
            [
                'currency_title' => 'Euro',
                'currency_code' => 'EUR',
                'currency_symbol' => '€'
            ]
        ]);
    }
}
