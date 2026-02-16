<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Branch::factory()->createMany([
            ['branch' => 'Manila'],
            ['branch' => 'Masbate'],
            ['branch' => 'Caticlan'],
            ['branch' => 'Kalibo'],
            ['branch' => 'Antique'],
            ['branch' => 'Roxas'],
            ['branch' => 'Iloilo'],
            ['branch' => 'Bacolod'],
        ]);

        Role::factory()->createMany([
            ['role' => 'Admin'],
            ['role' => 'Manager'],
            ['role' => 'Staff'],
        ]);

        User::factory(100)->create();
    }
}
