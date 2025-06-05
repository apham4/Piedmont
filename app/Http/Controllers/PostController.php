<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Post;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Reactions;

class PostController extends Controller
{
    public function show(Request $request, int $id): Response
    {
        // Fetch the post by ID and return it
        $post = Post::with(['poster', 'category', 'comments', 'comments.user', 'reactions'])->findOrFail($id);

        return Inertia::render('post/postview', [
            'post' => $post,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('post/postform');
    }

    public function store(Request $request)
    {
        // Process Category
        $categoryPath = $request->input('category');
        $categoryNames = array_map('trim', explode('>', $categoryPath));
        $parentId = null;
        foreach ($categoryNames as $name) {
            $category = Category::firstOrCreate(
                ['name' => $name, 'child_of' => $parentId]
            );
            $parentId = $category->id;
        }
        $category_id = $parentId;
        $request->merge(['category_id' => $category_id]);

        // Validate and store the post data
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'user_id' => auth()->id(),
            ...$data,
        ]);

        return redirect()->route('post.show', ['id' => $post->id]);
    }
}
