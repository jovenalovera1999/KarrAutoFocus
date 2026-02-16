<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class MotherFile extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_mother_files';
    protected $primaryKey = 'mother_file_id';
    protected $fillable = [
        'mother_file',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'mother_file_id', 'mother_file_id');
    }
}
