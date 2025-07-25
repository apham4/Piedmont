<?php

namespace Tests\Feature\Discussion;

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ThreadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_a_post()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();

        $response = $this->actingAs($user)->post('/newpost', [
            'title' => 'Test Post',
            'category' => $category->name,
            'content' => 'This is a test post.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('posts', ['title' => 'Test Post']);
    }

    public function test_user_can_delete_own_post()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id, 'category_id' => $category->id]);

        $response = $this->actingAs($user)->post("/post/{$post->id}/delete");
        $response->assertRedirect();
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    public function test_user_cannot_edit_post_after_60_minutes()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'created_at' => now()->subMinutes(61),
        ]);

        $response = $this->actingAs($user)->post("/post/{$post->id}", [
            'title' => 'Late Edit',
            'category' => $category->name,
            'content' => 'Late edit content',
        ]);
        $response->assertRedirect(route('post.show', ['id' => $post->id]));
        $this->assertDatabaseMissing('posts', ['title' => 'Late Edit']);
    }

    public function test_guest_cannot_create_post()
    {
        $category = Category::factory()->create();

        $response = $this->post('/newpost', [
            'title' => 'Guest Post',
            'category' => $category->name,
            'content' => 'Should not work',
        ]);

        $response->assertRedirect('/login');
    }

    public function test_user_cannot_delete_others_post()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create(['user_id' => $user1->id, 'category_id' => $category->id]);

        $response = $this->actingAs($user2)->post("/post/{$post->id}/delete");
        $response->assertStatus(403);
        $this->assertDatabaseHas('posts', ['id' => $post->id]);
    }
}
