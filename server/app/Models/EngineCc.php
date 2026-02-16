<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class EngineCc extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_engine_ccs';
    protected $primaryKey = 'engine_cc_id';
    protected $fillable = [
        'engine_cc',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'engine_cc_id', 'engine_cc_id');
    }
}
