<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

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

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
