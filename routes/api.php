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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Project settings methods
Route::get('settings', 'SettingsController@index');

//Menu categories methods
Route::get('categories', 'CategoryController@index');
Route::post('categories/add', 'CategoryController@create');
Route::post('categories/edit/{id}', 'CategoryController@update');
Route::post('categories/delete/{id}', 'CategoryController@delete');

//Menu itself methods
Route::get('menu/{id}', 'MenuController@index');
Route::get('menu/item/{id}','MenuController@getItem');
Route::post('menu/add', 'MenuController@create');
Route::post('menu/edit/{id}', 'MenuController@update');
Route::post('menu/delete/{id}', 'MenuController@delete');

//Orders methods
Route::post('order/add', 'OrderController@add');
