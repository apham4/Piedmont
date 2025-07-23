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
use App\Models\Reaction;

class PostController extends Controller
{
    public function show(Request $request, int $id): Response
    {
        // Fetch the post by ID and return it
        $post = Post::with(['poster', 'category', 'comments', 'comments.user', 'comments.reactions', 'reactions'])->findOrFail($id);
        
        $breadcrumbs = [];
        $current = $post->category;
        while ($current) 
        {
            $breadcrumbs[] = $current;
            $current = $current->parent;
        }
        $breadcrumbs = array_reverse($breadcrumbs);

        $authUser = $request->user();

        return Inertia::render('post/postview', [
            'post' => $post,
            'comments' => $post->comments,
            'breadcrumbs' => $breadcrumbs,
            'auth' => [
                'user' => $authUser
                    ? [
                        'id' => $authUser->id,
                        'name' => $authUser->name,
                    ]
                    : null,
            ],
        ]);
    }

    public function create(Request $request): Response
    {
        $categorySuggestions = $this->getCategorySuggestions();

        return Inertia::render('post/postform', [
            'categorySuggestions' => $categorySuggestions,
        ]);
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

    public function addReaction(Request $request, int $postId, int $reactionType)
    {
        $userId = auth()->id();

        $existing = Reaction::where([
            'user_id' => $userId,
            'content_id' => $postId,
            'content_type' => 1,
            'reaction_type' => $reactionType,
        ])->first();

        if ($existing) 
        {
            $existing->delete();
        } else 
        {
            Reaction::create([
                'user_id' => $userId,
                'content_id' => $postId,
                'content_type' => 1,
                'reaction_type' => $reactionType,
            ]);
        }

        return redirect()->back();
    }

    public function addComment(Request $request, int $postId)
    {
        $data = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        Comment::create([
            'user_id' => auth()->id(),
            'post_id' => $postId,
            'content' => $data['content'],
        ]);

        // Reload only the comments and clear the form
        $post = Post::with(['comments.user'])->findOrFail($postId);

        return redirect()->route('post.show', ['id' => $postId])
            ->with([
                'comments' => $post->comments,
            ]);
    }

    public function edit(Request $request, int $postId): Response
    {
        $categorySuggestions = $this->getCategorySuggestions();
        $post = Post::findOrFail($postId);
        
        $breadcrumbs = [];
        $current = $post->category;
        while ($current) 
        {
            $breadcrumbs[] = $current->name;
            $current = $current->parent;
        }
        $breadcrumbsString = implode('>', array_reverse($breadcrumbs));

        return Inertia::render('post/postform', [
            'categorySuggestions' => $categorySuggestions,
            'post' => $post,
            'postCategory' => $breadcrumbsString,
        ]);
    }

    public function update(Request $request, int $postId)
    {
        // Find the post and update
        $post = Post::findOrFail($postId);

        // Check if more than 60 minutes have passed since creation
        if (now()->greaterThan($post->created_at->addMinutes(60))) {
            return redirect()->route('post.show', ['id' => $post->id]);
        }
        else {
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
            
            $post->update([
                'title' => $data['title'],
                'category_id' => $category_id,
                'content' => $data['content'],
            ]);

            return redirect()->route('post.show', ['id' => $post->id]);
        }
    }

    private function getCategorySuggestions()
    {
        $categorySuggestions = Category::all()->map(function($cat) {
            $breadcrumbs = [];
            $current = $cat;
            while ($current) {
                $breadcrumbs[] = $current->name;
                $current = $current->parent;
            }
            return implode('>', array_reverse($breadcrumbs));
        })->unique()->values();

        return $categorySuggestions;
    }
}