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
            return Inertia::render('home', [
                'category' => $category,
                'sub_categories' => $this->get_subcategories($category),
                'posts' => $this->get_posts_in_category($category)
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

    private function get_posts_in_category($category)
    {
        // This function should return posts based on the category
        // For now, it returns an empty array
        return [];
    }
}
