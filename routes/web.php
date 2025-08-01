<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/category/{id?}', [HomeController::class, 'index'])->name('home.category');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('newpost', [PostController::class, 'create'])->name('post.create');
    Route::post('newpost', [PostController::class, 'store'])->name('post.store');

    Route::get('post/{id}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::post('post/{id}', [PostController::class, 'update'])->name('post.update');
    Route::post('/post/{id}/delete', [PostController::class, 'delete'])->name('post.delete');

    Route::get('post/{id}', [PostController::class, 'show'])->name('post.show');

    Route::post('/posts/{postId}/react/{reactionType}', [PostController::class, 'addReaction'])->name('post.react');
    Route::post('/posts/{postId}/comment', [PostController::class, 'addComment'])->name('post.addComment');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/comment/{commentId}/react/{reactionType}', [CommentController::class, 'addReaction'])->name('comment.react');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('user/{id}', [UserController::class, 'show'])->name('user.show');
    Route::get('/user/{id}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::post('/user/{id}/edit', [UserController::class, 'update'])->name('user.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
