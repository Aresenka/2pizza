<?php

namespace App\Http\Controllers;

use App\Currency;
use App\Settings;

class SettingsController extends Controller
{
    public function index(){
        $settings = [
            'currencies' => []
        ];

        $data = Settings::all();
        foreach($data as $item){
            $settings[$item->setting_title] = $item->setting_value;
        }

        $currencies = Currency::where('deleted_at', null)->get();
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
