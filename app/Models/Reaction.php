<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    /** @use HasFactory<\Database\Factories\ReactionFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id', // ID of the user who reacted
        'content_id', // ID of the content (post or comment) that was reacted to
        'content_type', // Type of content (e.g., 'post' or 'comment')
        'reaction_type', // Type of reaction (e.g., 'like', 'dislike', 'laugh', etc.)
    ];
}
