<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name', // Name of the category
        'description', // Description of the category
        'child_of' // ID of the parent category, if this is a subcategory
    ];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'child_of');
    }
}
