<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolesPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Forget cached roles and permissions
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        // Delete role-permission relations
        \DB::table('role_has_permissions')->delete();
        \DB::table('model_has_roles')->delete();
        \DB::table('model_has_permissions')->delete();

        // Delete roles and permissions
        Role::query()->delete();
        Permission::query()->delete();
        // Reset cached roles and permissions

        // Create permissions
        Permission::create(['name' => 'edit post']);
        Permission::create(['name' => 'delete post']);
        Permission::create(['name' => 'publish post']);
        Permission::create(['name' => 'create post']);

        $roleViewver = Role::create(['name' => 'viewer']);
        $roleViewver->givePermissionTo(['publish post']);

        // Create roles and assign permissions
        $roleWriter = Role::create(['name' => 'Creator']);
        $roleWriter->givePermissionTo(['edit post', 'create post', 'delete post']);

        $roleAdmin = Role::create(['name' => 'admin']);
        $roleAdmin->givePermissionTo(Permission::all()); // Assign all permissions

        $roleSuperAdmin = Role::create(['name' => 'super-admin']);
    }
}