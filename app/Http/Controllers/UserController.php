<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\User;

class UserController extends Controller
{
    public function show(Request $request, int $id): Response
    {
        $user = User::findOrFail($id);
        return Inertia::render('user/userview', [
            'user' => $user
        ]);
    }
}
