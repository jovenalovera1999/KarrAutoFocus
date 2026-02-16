<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Color extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_colors';
    protected $primaryKey = 'color_id';
    protected $fillable = [
        'color',
    ];
}
