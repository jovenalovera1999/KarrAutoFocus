<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class CarStatus extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_car_status';
    protected $primaryKey = 'car_status_id';
    protected $fillable = [
        'car_status',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'car_status_id', 'car_status_id');
    }
}
