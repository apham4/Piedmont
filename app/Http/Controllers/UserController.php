<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Reaction;

class UserController extends Controller
{
    public function show(Request $request, int $id): Response
    {
        $user = User::findOrFail($id);

        // Get all posts and comments by this user
        $posts = Post::where('user_id', $user->id)->get();
        $comments = Comment::where('user_id', $user->id)->get();

        // Get all reactions for those posts and comments
        $postIds = $posts->pluck('id')->toArray();
        $commentIds = $comments->pluck('id')->toArray();

        $reactions = Reaction::where(function ($query) use ($postIds, $commentIds) {
            $query->where(function ($q) use ($postIds) {
                $q->where('content_type', 1)->whereIn('content_id', $postIds);
            })->orWhere(function ($q) use ($commentIds) {
                $q->where('content_type', 2)->whereIn('content_id', $commentIds);
            });
        })->get();

        // Pass authenticated user for isSelf logic
        $authUser = $request->user();

        return Inertia::render('user/userview', [
            'user' => $user,
            'posts' => $posts,
            'comments' => $comments,
            'reactions' => $reactions,
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
}
