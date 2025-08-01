<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'user' => function () {
                return Auth::user()
                    ? [
                        'id' => Auth::user()->id,
                        'name' => Auth::user()->name,
                        // add other fields as needed
                    ]
                    : null;
            },
            'appName' => config('app.name'),
        ]);
    }
}
