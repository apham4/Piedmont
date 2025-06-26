<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Route::get('/user', [UserController::class, 'index']);

// Route::match(['get', 'post'], '/', function () {
// });

// Route::redirect('/here', '/there');

// Route::controller(OrderController::class)->group(function () {
//     Route::get('/orders/{id}', 'show');
//     Route::post('/orders', 'store');
// });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('newpost', [PostController::class, 'create'])->name('post.create');
    Route::post('newpost', [PostController::class, 'store'])->name('post.store');

    Route::get('post/{id}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::post('post/{id}', [PostController::class, 'update'])->name('post.update');

    Route::get('post/{id}', [PostController::class, 'show'])->name('post.show');

    Route::post('/posts/{postId}/react/{reactionType}', [PostController::class, 'addReaction'])->name('post.react');
    Route::post('/posts/{postId}/comment', [PostController::class, 'addComment'])->name('post.addComment');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';