<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id', // ID of the user who created the post
        'title', // Title of the post
        'category_id', // Category of the post
        'content', // Content of the post
    ];
}
