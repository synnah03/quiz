<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RolesAndSuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        Role::firstOrCreate(['name' => 'student']);
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'super-admin']);

        // Create Super Admin user
        $user = User::firstOrCreate(
            ['email' => 'super@admin.admin'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('superadmin'),
            ]
        );

        //Assign role
        $user->assignRole('super-admin');

        $user = User::firstOrCreate(
            ['email' => 'student@admin.admin'],
            [
                'name' => 'student 001',
                'password' => Hash::make('student001'),
            ]
        );

        $user->assignRole('student');
    }
}