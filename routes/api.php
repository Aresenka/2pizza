<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api-header'], function () {
//Project settings methods
    Route::get('settings', 'SettingsController@index');

//Menu categories methods
    Route::get('categories', 'CategoryController@index');

//Menu itself methods
    Route::get('menu/{id}', 'MenuController@index');

//Orders methods
    Route::post('order/add', 'OrderController@add');

//Auth methods
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {
//Admin methods
    Route::get('admin/order/get/all', 'OrderController@getOrders');
    Route::post('admin/order/update', 'OrderController@update');
    Route::post('admin/settings/update', 'SettingsController@update');
});
