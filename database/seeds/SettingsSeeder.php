<?php

use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            [
                'setting_title' => 'project name',
                'setting_value' => '2Pizza'
            ],
            [
                'setting_title' => 'site title',
                'setting_value' => 'Fake pizzeria 2Pizza'
            ],
            [
                'setting_title' => 'default currency',
                'setting_value' => 1
            ]
        ]);
    }
}
