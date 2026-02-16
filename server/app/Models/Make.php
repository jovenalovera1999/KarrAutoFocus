<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Make extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_makes';
    protected $primaryKey = 'make_id';
    protected $fillable = [
        'make',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'make_id', 'make_id');
    }
}
