<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Car;
use App\Models\CarStatus;
use App\Models\Color;
use App\Models\Encumbered;
use App\Models\EngineCc;
use App\Models\Make;
use App\Models\MotherFile;
use App\Models\Role;
use App\Models\TransferStatus;
use App\Models\Transmission;
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

        Make::factory()->createMany([
            ['make' => 'Chevrolet'],
            ['make' => 'Ford'],
            ['make' => 'Foton'],
            ['make' => 'Honda'],
            ['make' => 'Hyundai'],
            ['make' => 'Isuzu'],
            ['make' => 'Kia'],
            ['make' => 'Mazda'],
            ['make' => 'MG'],
            ['make' => 'Mitsubishi'],
            ['make' => 'Nissan'],
            ['make' => 'Subaru'],
            ['make' => 'Suzuki'],
            ['make' => 'Toyota'],
            ['make' => 'Volkswagen'],
        ]);

        Transmission::factory()->createMany([
            ['transmission' => 'M/T'],
            ['transmission' => 'A/T'],
        ]);

        CarStatus::factory()->createMany([
            ['car_status' => 'Available'],
            ['car_status' => 'Reserved'],
            ['car_status' => 'Sold'],
        ]);

        Color::factory()->createMany([
            ['color' => 'Matte Black'],
            ['color' => 'Royal Blue'],
            ['color' => 'White'],
            ['color' => 'Black'],
            ['color' => 'Gray'],
            ['color' => 'Pink'],
            ['color' => 'Cyan'],
            ['color' => 'Red'],
        ]);

        Encumbered::factory()->createMany([
            ['encumbered' => 'Metrobank'],
            ['encumbered' => 'BPI'],
            ['encumbered' => 'BDO'],
            ['encumbered' => 'PNB'],
            ['encumbered' => 'PS Bank'],
            ['encumbered' => 'RCBC'],
            ['encumbered' => 'Chinabank'],
            ['encumbered' => 'EastWeast Bank'],
        ]);

        EngineCc::factory()->createMany([
            ['engine_cc' => '113 Cc'],
            ['engine_cc' => '125 Cc'],
            ['engine_cc' => '200 Cc'],
            ['engine_cc' => '250 Cc'],
            ['engine_cc' => '300 Cc'],
            ['engine_cc' => '325 Cc'],
            ['engine_cc' => '400 Cc'],
            ['engine_cc' => '500 Cc'],
            ['engine_cc' => '800 Cc'],
            ['engine_cc' => '900 Cc'],
            ['engine_cc' => '1000 Cc'],
        ]);

        MotherFile::factory()->createMany([
            ['mother_file' => 'Region 1'],
            ['mother_file' => 'Region 2'],
            ['mother_file' => 'Region 3'],
            ['mother_file' => 'Region 4'],
            ['mother_file' => 'Region 5'],
            ['mother_file' => 'Region 6'],
            ['mother_file' => 'Region 7'],
            ['mother_file' => 'Region 8'],
            ['mother_file' => 'Roxas'],
            ['mother_file' => 'Iloilo'],
            ['mother_file' => 'Antique'],
            ['mother_file' => 'Kalibo'],
            ['mother_file' => 'Caticlan'],
        ]);

        TransferStatus::factory()->createMany([
            ['transfer_status' => 'Transferred Roxas'],
            ['transfer_status' => 'Transferred Iloilo'],
            ['transfer_status' => 'Transferred Kalibo'],
            ['transfer_status' => 'Transferred Antique'],
            ['transfer_status' => 'Transferred Caticlan'],
            ['transfer_status' => 'Pending Roxas'],
            ['transfer_status' => 'Pending Iloilo'],
            ['transfer_status' => 'Pending Kalibo'],
            ['transfer_status' => 'Pending Antique'],
            ['transfer_status' => 'Pending Caticlan'],
        ]);

        Car::factory(100)->create();
    }
}
