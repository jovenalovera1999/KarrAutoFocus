<?php

namespace Database\Factories;

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
            'encode_date' => $this->faker->date(),
            'year_model' => $this->faker->text(100),
            'make_id' => Make::inRandomOrder()->first()->make_id,
            'series' => $this->faker->word(),
            'transmission_id' => Transmission::inRandomOrder()->first()->transmission_id,
            'color_id' => Color::inRandomOrder()->first()->color_id,
            'price' => $this->faker->numberBetween(100000, 2000000),
            'plate_number' => strtoupper($this->faker->bothify('??? ####')),
            'mother_file_id' => MotherFile::inRandomOrder()->first()->mother_file_id,
            'mv_file_number' => strtoupper($this->faker->bothify('MV#####')),
            'engine_number' => strtoupper($this->faker->bothify('EN######')),
            'chassis_number' => strtoupper($this->faker->bothify('CH######')),
            'engine_cc_id' => EngineCc::inRandomOrder()->first()->engine_cc_id,
            'car_status_id' => CarStatus::inRandomOrder()->first()->car_status_id,
            'original_or_cr_received' => $this->faker->optional()->date(),
            'encumbered_id' => Encumbered::inRandomOrder()->first()->encumbered_id,
            'rod_received' => $this->faker->optional()->date(),
            'rod_paid' => $this->faker->optional()->date(),
            'last_registered' => $this->faker->optional()->date(),
            'confirmation_request' => $this->faker->optional()->date(),
            'confirmation_received' => $this->faker->optional()->date(),
            'hpg_clearance' => $this->faker->optional()->date(),
            'transfer_status_id' => TransferStatus::inRandomOrder()->first()->transfer_status_id,
            'first_owner' => $this->faker->name(),
            'address' => $this->faker->address(),
        ];
    }
}
