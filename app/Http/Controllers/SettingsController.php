<?php

namespace App\Http\Controllers;

use App\Currency;
use App\Settings;

class SettingsController extends Controller
{
    /**
     * Return site settings and list of not deleted currencies
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        //Array to return
        $settings = [
            'currencies' => []
        ];

        //Get all settings
        $data = Settings::all();

        //Add settings to array used title as an key
        foreach($data as $item){
            $settings[$item->setting_title] = $item->setting_value;
        }

        //Get all not deleted currencies
        $currencies = Currency::where('deleted_at', null)->get();

        //Add each currency to array['currencies']
        foreach($currencies as $currency){
            $settings['currencies'][$currency->id] = [
                'id' => $currency->id,
                'title' => $currency->currency_title,
                'code' => $currency->currency_code,
                'symbol' => $currency->currency_symbol
            ];
        }

        return response()->json($settings);
    }
}
