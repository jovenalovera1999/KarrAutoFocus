<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Buyer extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_buyers';
    protected $primaryKey = 'buyer_id';
    protected $fillable = [
        'buyer',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'buyer_id', 'buyer_id');
    }
}
