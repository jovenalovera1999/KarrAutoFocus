<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Encumbered extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_encumbereds';
    protected $primaryKey = 'encumbered_id';
    protected $fillable = [
        'encumbered',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'encumbered_id', 'encumbered_id');
    }
}
