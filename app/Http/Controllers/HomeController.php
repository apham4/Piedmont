<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Category;
use App\Models\Post;

class HomeController extends Controller
{
    public function index(Request $request, $id = null)
    {
        if ($request->user()) {
            // If authenticated, redirect to home page
            $breadcrumbs = [];
            if ($id) 
            {
                // Viewing a specific category
                $category = Category::findOrFail($id);
                $sub_categories = Category::where('child_of', $id)->get();
                $posts = Post::where('category_id', $id)->get();

                $current = $category;
                while ($current) {
                    $breadcrumbs[] = $current;
                    $current = $current->parent;
                }
                $breadcrumbs = array_reverse($breadcrumbs);
            } 
            else 
            {
                // Home page: show only root categories
                $category = null;
                $sub_categories = Category::whereNull('child_of')->get();
                $posts = [];
            }

            return Inertia::render('home', [
                'category' => $category,
                'sub_categories' => $sub_categories,
                'breadcrumbs' => $breadcrumbs,
                'posts' => $posts,
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
        // For now, it returns a placeholder array
        return ['Hardware', 'Software', 'Networking', 'Security'];
    }

    private function get_posts_in_category($category)
    {
        // This function should return posts based on the category
        // For now, it returns an empty array
        return [];
    }
}
