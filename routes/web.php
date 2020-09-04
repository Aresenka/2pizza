<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

function getParameters(){
    $parameters = [];
    $settings = \App\Settings::all();

    foreach ($settings as $setting){
        $parameters['settings'][$setting->setting_title] = $setting->setting_value;
    }

    return $parameters;
}

Route::view('/{path?}', 'app', getParameters());
