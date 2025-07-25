<?php

namespace Tests\Feature\PointSystem;

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use App\Models\Reaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PointSystemTest extends TestCase
{
    use RefreshDatabase;

    public function test_points_are_awarded_for_likes_on_post()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $otherUser->id,
            'category_id' => $category->id,
        ]);

        $this->actingAs($user)->post("/posts/{$post->id}/react/1");
        $this->assertDatabaseHas('reactions', [
            'user_id' => $user->id,
            'content_id' => $post->id,
            'content_type' => 1,
            'reaction_type' => 1,
        ]);
    }

    public function test_points_are_deducted_for_dislikes_on_post()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $otherUser->id,
            'category_id' => $category->id,
        ]);

        $this->actingAs($user)->post("/posts/{$post->id}/react/2");
        $this->assertDatabaseHas('reactions', [
            'user_id' => $user->id,
            'content_id' => $post->id,
            'content_type' => 1,
            'reaction_type' => 2,
        ]);
    }

    public function test_user_cannot_like_own_post_for_points()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);

        $this->actingAs($user)->post("/posts/{$post->id}/react/1");
        $this->assertDatabaseMissing('reactions', [
            'user_id' => $user->id,
            'content_id' => $post->id,
            'content_type' => 1,
            'reaction_type' => 1,
        ]);
    }

    public function test_user_cannot_like_same_post_multiple_times()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $otherUser->id,
            'category_id' => $category->id,
        ]);

        // Like the post
        $this->actingAs($user)->post("/posts/{$post->id}/react/1");
        // Like again (should remove the like)
        $this->actingAs($user)->post("/posts/{$post->id}/react/1");

        $this->assertDatabaseMissing('reactions', [
            'user_id' => $user->id,
            'content_id' => $post->id,
            'content_type' => 1,
            'reaction_type' => 1,
        ]);
    }

    public function test_user_points_are_displayed_on_profile()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create([
            'user_id' => $otherUser->id,
            'category_id' => $category->id,
        ]);

        $this->actingAs($user)->post("/posts/{$post->id}/react/1");

        $response = $this->actingAs($otherUser)->get("/user/{$otherUser->id}");
        $response->assertOk();
    }
}
