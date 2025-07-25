<?php

namespace Tests\Feature\Interaction;

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InteractionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_add_comment_to_post()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id, 'category_id' => $category->id]);

        $response = $this->actingAs($user)->post("/posts/{$post->id}/comment", [
            'content' => 'This is a comment.',
        ]);
        $response->assertRedirect();
        $this->assertDatabaseHas('comments', ['content' => 'This is a comment.']);
    }

    public function test_guest_cannot_add_comment_to_post()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id, 'category_id' => $category->id]);

        $response = $this->post("/posts/{$post->id}/comment", [
            'content' => 'Guest comment',
        ]);
        $response->assertRedirect('/login');
    }

    public function test_user_can_react_to_post()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create(['user_id' => $otherUser->id, 'category_id' => $category->id]);

        $response = $this->actingAs($user)->post("/posts/{$post->id}/react/1");
        $response->assertRedirect();
        $this->assertDatabaseHas('reactions', ['user_id' => $user->id, 'content_id' => $post->id, 'reaction_type' => 1]);
    }

    public function test_user_can_react_to_comment()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create(['user_id' => $otherUser->id, 'category_id' => $category->id]);
        $comment = Comment::factory()->create([
            'user_id' => $otherUser->id,
            'post_id' => $post->id,
            'content' => 'Test comment',
        ]);

        $response = $this->actingAs($user)->post("/comment/{$comment->id}/react/1");
        $response->assertRedirect();
        $this->assertDatabaseHas('reactions', ['user_id' => $user->id, 'content_id' => $comment->id, 'reaction_type' => 1]);
    }

    public function test_user_can_view_comments_on_post()
    {
        $user = User::factory()->create();
        $category = Category::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id, 'category_id' => $category->id]);
        $comment = Comment::factory()->create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'content' => 'Test comment',
        ]);

        $response = $this->actingAs($user)->get("/post/{$post->id}");
        $response->assertOk();
    }
}
