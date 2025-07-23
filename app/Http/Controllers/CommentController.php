<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reaction;

class CommentController extends Controller
{
    public function addReaction(Request $request, int $commentId, int $reactionType)
    {
        $userId = auth()->id();

        $existing = Reaction::where([
            'user_id' => $userId,
            'content_id' => $commentId,
            'content_type' => 2,
            'reaction_type' => $reactionType,
        ])->first();

        if ($existing) 
        {
            $existing->delete();
        } 
        else 
        {
            Reaction::create([
                'user_id' => $userId,
                'content_id' => $commentId,
                'content_type' => 2,
                'reaction_type' => $reactionType,
            ]);
        }

        return redirect()->back();
    }
}
