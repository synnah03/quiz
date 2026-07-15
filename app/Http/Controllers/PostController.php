<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    public function index()
    {
        // Viewing posts is allowed for everyone (or logged-in users)
        $posts = Post::latest()->paginate(4);

        return inertia('Posts', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        // Only users with "create post"
        // $this->authorize('create', Post::class);

        return inertia('Create');
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'body' => ['required'],
        ]);

        Post::create($fields);

        return redirect()
            ->route('posts.index')
            ->with('success', 'New post created');
    }

    public function show(Post $post)
    {
        return inertia('Show', [
            'post' => $post,
        ]);
    }

    public function edit(Post $post)
    {
        return inertia('Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $fields = $request->validate([
            'body' => ['required'],
        ]);

        $post->update($fields);

        return redirect()
            ->route('posts.index')
            ->with('success', 'Update successfully');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()
            ->route('posts.index')
            ->with('message', 'Post deleted');
    }
}
