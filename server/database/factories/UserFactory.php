<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'middle_name' => fake()->lastName(),
            'last_name' => fake()->lastName(),
            'suffix_name' => fake()->optional(.2)->randomElement(['Jr.', 'Sr.', 'I', "II", 'III', 'IV', 'V']),
            'birth_date' => fake()->date(),
            'contact_number' => fake()->phoneNumber(),
            'email' => fake()->optional(.7)->safeEmail(),
            'username' => fake()->userName(6, 12),
            'password' => 'user1234',
            'branch_id' => Branch::inRandomOrder()->first()->branch_id,
            'role_id' => Role::inRandomOrder()->first()->role_id,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
