<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Car extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_cars';
    protected $primaryKey = 'car_id';
    protected $fillable = [
        'encode_date',
        'year_model',
        'make_id',
        'series',
        'transmission_id',
        'color_id',
        'price',
        'plate_number',
        'mother_file_id',
        'mv_file_number',
        'engine_number',
        'chassis_number',
        'engine_cc_id',
        'car_status_id',
        'original_or_cr_received',
        'encumbered_id',
        'rod_received',
        'rod_paid',
        'last_registered',
        'confirmation_request',
        'confirmation_received',
        'hpg_clearance',
        'transfer_status_id',
        'first_owner',
        'address',
    ];

    public function make() {
        return $this->belongsTo(Make::class, 'make_id', 'make_id')->withTrashed();
    }

    public function transmission() {
        return $this->belongsTo(Transmission::class, 'transmission_id', 'transmission_id')->withTrashed();
    }

    public function mother_file() {
        return $this->belongsTo(MotherFile::class, 'mother_file_id', 'mother_file_id')->withTrashed();
    }

    public function engine_cc() {
        return $this->belongsTo(EngineCc::class, 'engine_cc_id', 'engine_cc_id')->withTrashed();
    }

    public function car_status() {
        return $this->belongsTo(CarStatus::class, 'car_status_id', 'car_status_id')->withTrashed();
    }

    public function encumbered() {
        return $this->belongsTo(Encumbered::class, 'encumbered_id', 'encumbered_id')->withTrashed();
    }

    public function transfer_status() {
        return $this->belongsTo(TransferStatus::class, 'transfer_status_id', 'transfer_status_id')->withTrashed();
    }
}
