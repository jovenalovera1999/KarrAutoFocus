<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Transmission extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_transmissions';
    protected $primaryKey = 'transmission_id';
    protected $fillable = [
        'transmission',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'transmission_id', 'transmission_id');
    }
}
