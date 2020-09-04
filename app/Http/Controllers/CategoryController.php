<?php

namespace App\Http\Controllers;

use App\MealCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $categories = MealCategory::where('deleted_at', null)
            ->orderBy('id', 'asc')
            ->get();
        return $categories->toJson();
    }

    public function create(Request $request){
        $data = $request->validate(['title' => 'required']);

        MealCategory::create([
            'meal_cat_title' => $data['title']
        ]);

        return response()->json('Category created!');
    }
}
