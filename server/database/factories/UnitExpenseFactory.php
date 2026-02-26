<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UnitExpense>
 */
class UnitExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'car_id' => Car::inRandomOrder()->first()->car_id,
            'amount' => $this->faker->numberBetween(100000, 2000000),
            'description' => $this->faker->text(50),
        ];
    }
}
