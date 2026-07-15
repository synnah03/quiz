<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'user' => Auth::user(),
        'posts' => Post::latest()->take(5)->get(),
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated routes (any logged-in user, regardless of role)
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Viewing posts — any logged-in user, no role restriction
    Route::get('posts', [PostController::class, 'index'])->name('posts.index');

    // Viewing a specific quiz attempt result — controller checks ownership itself
    Route::get('quiz', [QuizController::class, 'index'])->name('quiz.index');
    Route::get('quiz-attempt/{attempt}', [QuizController::class, 'attemptResult'])
        ->name('quiz.results.attempt');

    /*
    |----------------------------------------------------------------------
    | Student-only
    |----------------------------------------------------------------------
    */
    Route::middleware('role:student')->group(function () {
        Route::get('quiz/{quiz}/take', [QuizController::class, 'take'])
            ->name('quiz.take');

        Route::post('quiz/{quiz}/submit', [QuizController::class, 'submit'])
            ->name('quiz.submit');
    });

    /*
    |----------------------------------------------------------------------
    | Admin / Super-admin only
    |----------------------------------------------------------------------
    */
    Route::middleware('role:admin|super-admin')->group(function () {

        // Quiz management
        Route::get('quiz/create', [QuizController::class, 'create'])->name('quiz.create');
        Route::post('quiz', [QuizController::class, 'store'])->name('quiz.store');
        Route::get('quiz/{quiz}/edit', [QuizController::class, 'edit'])->name('quiz.edit');
        Route::put('quiz/{quiz}', [QuizController::class, 'update'])->name('quiz.update');
        Route::delete('quiz/{quiz}', [QuizController::class, 'destroy'])->name('quiz.destroy');
        Route::get('quiz/{quiz}/results', [QuizController::class, 'results'])->name('quiz.results');

        // Post management — static segments (create) MUST come before the {post} wildcard below
        Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');
        Route::post('posts', [PostController::class, 'store'])->name('posts.store');
        Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::put('posts/{post}', [PostController::class, 'update'])->name('posts.update');
        Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

        // User, role, image management
        Route::resource('user', UserController::class);
        Route::resource('role', RoleController::class);
        Route::resource('image', ImageController::class);

        Route::get('user/password', [UserController::class, 'editPassword'])->name('user.password.edit');
        Route::put('user/password', [UserController::class, 'updatePassword'])->name('user.password.update');
        Route::get('user/role', [UserController::class, 'editPassword'])->name('user.role.edit');
        Route::put('user/role', [UserController::class, 'updatePassword'])->name('user.role.update');
        Route::get('image/upload', [UserController::class, 'uploadFile'])->name('image.uploadFile');
        Route::put('image/upload', [UserController::class, 'saveImage'])->name('image.saveImage');
    });

    // posts/{post} wildcard — registered LAST so it never swallows posts/create above
    Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
});

require __DIR__.'/auth.php';