<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id', // ID of the user who created the comment
        'post_id', // Title of the post this comment is on
        'content', // Content of the comment
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'content_id')->where('content_type', 2);
    }
}
