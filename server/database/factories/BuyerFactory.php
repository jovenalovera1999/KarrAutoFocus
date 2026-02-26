<?php

namespace Database\Factories;

use App\Models\Agent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Buyer>
 */
class BuyerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'buyer' => fake()->name(),
            'address' => fake()->address(),
            'agreed_price' => fake()->numberBetween(10000, 80000),
            'date_reserved' => fake()->date(),
            'agent_id' => Agent::inRandomOrder()->first()->agent_id,
        ];
    }
}
