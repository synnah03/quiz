<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        sleep(1);
        $user = User::with('roles')->get();
        return inertia('Users/index', [ 'user' => $user ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        sleep(1);
        return inertia('Users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    sleep(1);
    $fields = $request->validate([
        'name' => ['required', 'string', 'max:255', 'min:3', 'regex:/^[a-zA-Z0-9\s\-_.]+$/'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
        'password' => [
            'required',
            'string',
            'min:8',                 // at least 8 characters
            'confirmed',             // checks password_confirmation field
            'regex:/[A-Z]/',         // must contain at least one uppercase letter
            'regex:/[a-z]/',         // must contain at least one lowercase letter
            'regex:/[0-9]/',         // must contain at least one number
            'regex:/[@$!%*?&]/',     // must contain at least one special character
        ],
    ], [
        'password.confirmed' => 'The password confirmation does not match.',
        'password.regex' => 'Password must contain uppercase, lowercase, number, and special character.',
    ]);

    // ✅ Hash password before storing
    $fields['password'] = Hash::make($fields['password']);

    // ✅ Create user
    $user = User::create($fields);

    $user->assignRole('viewer');

    // ✅ Redirect with flash message
    return redirect()
        ->route('users.index')
        ->with('success', 'New user has been created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        sleep(1);
        return inertia('Users/edit', ['user'=> $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        sleep(1);

        // ✅ Step 1: Validate input
        $fields = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'min:3',
                'regex:/^[a-zA-Z0-9\s\-_.]+$/',
            ],
            'password' => [
                'required',
                'string',
            ],
        ]);

        if (!Hash::check($fields['password'], $user->password)) {
            return redirect()->route('users.edit',['user'=> $user])->with('message', 'Incorrect password, update failed!');
        }

        $user->update([
            'name' => $fields['name'],
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully!');
    }

    public function editRole(User $user)
    {
        sleep(1);
        $role = Role::all()->toArray();
        return inertia('Users/editRole',['user' => $user, 'role' => $role]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => ['required', 'exists:roles,name'],
        ]);
        
        // Replace existing roles (important)
        $user->syncRoles([$request->role]);

        return redirect()
            ->route('users.index')
            ->with('success', 'Role updated successfully!');
    }

    public function editPassword(User $user)
    {
        return inertia('Users/editPassword', [
            'user' => $user
        ]);
    }

    // Handle password update
    public function updatePassword(Request $request, User $user)
    {
        $fields = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => [
                'required',
                'string',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols(),
                'confirmed',
            ],
        ], [
            'new_password.confirmed' => 'Password confirmation does not match.',
        ]);

        // ✅ Verify old password
        if (!Hash::check($fields['current_password'], $user->password)) {
            return redirect()->back()->with('message', 'Incorrect current password!');
        }

        // ✅ Update password
        $user->update([
            'password' => Hash::make($fields['new_password']),
        ]);

        return redirect()->route('users.index')->with('success', 'Password updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with(
            'message', 'User deleted'
        );
    }
}
