<?php

namespace Database\Factories;

use App\Models\Buyer;
use App\Models\CarStatus;
use App\Models\Color;
use App\Models\Encumbered;
use App\Models\EngineCc;
use App\Models\Make;
use App\Models\MotherFile;
use App\Models\TransferStatus;
use App\Models\Transmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'encode_date' => fake()->date(),
            'year_model' => fake()->text(50),
            'make_id' => Make::inRandomOrder()->first()->make_id,
            'series' => fake()->word(),
            'transmission_id' => Transmission::inRandomOrder()->first()->transmission_id,
            'color_id' => Color::inRandomOrder()->first()->color_id,
            'price' => fake()->numberBetween(100000, 2000000),
            'plate_number' => strtoupper(fake()->bothify('??? ####')),
            'mother_file_id' => MotherFile::inRandomOrder()->first()->mother_file_id,
            'mv_file_number' => strtoupper(fake()->bothify('MV#####')),
            'engine_number' => strtoupper(fake()->bothify('EN######')),
            'chassis_number' => strtoupper(fake()->bothify('CH######')),
            'engine_cc_id' => EngineCc::inRandomOrder()->first()->engine_cc_id,
            'car_status_id' => CarStatus::inRandomOrder()->first()->car_status_id,
            'original_or_cr_received' => fake()->optional()->date(),
            'encumbered_id' => Encumbered::inRandomOrder()->first()->encumbered_id,
            'rod_received' => fake()->optional()->date(),
            'rod_paid' => fake()->optional()->date(),
            'last_registered' => fake()->optional()->date(),
            'confirmation_request' => fake()->optional()->date(),
            'confirmation_received' => fake()->optional()->date(),
            'hpg_clearance' => fake()->optional()->date(),
            'transfer_status_id' => TransferStatus::inRandomOrder()->first()->transfer_status_id,
            'first_owner' => fake()->name(),
            'address' => fake()->address(),
            'buyer_id' => Buyer::inRandomOrder()->first()?->buyer_id,
        ];
    }
}
