<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    public function create(User $user): bool
    {
        return $user->can('create post');
    }

    public function update(User $user, Post $post): bool
    {
        return $user->can('edit post');
    }

    public function delete(User $user, Post $post): bool
    {
        return $user->can('delete post');
    }
}