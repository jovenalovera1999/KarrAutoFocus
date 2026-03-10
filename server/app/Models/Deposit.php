<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Deposit extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_deposits';
    protected $primaryKey = 'deposit_id';
    protected $fillable = [
        'amount',
        'description',
    ];
}
