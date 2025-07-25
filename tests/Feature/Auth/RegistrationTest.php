<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

        public function test_new_users_can_register()
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('home', absolute: false));
    }

    public function test_user_cannot_register_with_existing_email()
    {
        User::factory()->create(['email' => 'test@example.com']);
        $response = $this->post('/register', [
            'name' => 'Another User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);
        $response->assertSessionHasErrors('email');
    }

    public function test_lockout_after_5_failed_login_attempts()
    {
        $user = User::factory()->create(['password' => bcrypt('password')]);

        for ($i = 0; $i < 5; $i++) {
            $this->post('/login', [
                'email' => $user->email,
                'password' => 'wrong-password',
            ]);
        }

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors('email');
        $response->assertStatus(302); // Redirect back to login
    }

    public function test_profile_updates_and_visibility_settings_are_enforced()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->patch('/settings/profile', [
            'name' => 'Updated Name',
            'email' => $user->email,
            'is_dob_public' => false,
            'is_location_public' => false,
            'is_bio_public' => false,
        ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect('/settings/profile');

        $user->refresh();
        $this->assertSame('Updated Name', $user->name);
        $this->assertFalse((bool)$user->is_dob_public);
        $this->assertFalse((bool)$user->is_location_public);
        $this->assertFalse((bool)$user->is_bio_public);
    }
}
