<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()) {
            // If authenticated, redirect to home page
            $category = $request->query('category');
            $categories = $this->get_subcategories($category);
            return Inertia::render('home', [
                'categories' => $categories
            ]);
        }
        else
        {
            // If not authenticated, redirect to the login page
            return Inertia::render('welcome');
        }
    }

    private function get_subcategories($category)
    {
        // This function should return subcategories based on the category
        // For now, it returns an empty array
        return ['Hardware', 'Software', 'Networking', 'Security'];
    }
}
