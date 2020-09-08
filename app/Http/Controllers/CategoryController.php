<?php

namespace App\Http\Controllers;

use App\MealCategory;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Get JSON with all not deleted categories ordered by id
     *
     * @return string
     */
    public function index(){
        $categories = MealCategory::where('deleted_at', null)
            ->orderBy('id', 'asc')
            ->get();

        return $categories->toJson();
    }

    /**
     * Create new category
     *
     * @var Request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request){
        $data = $request->validate(['title' => 'required']);

        MealCategory::create([
            'meal_cat_title' => $data['title']
        ]);

        return response()->json('Category created!', 201);
    }
}
