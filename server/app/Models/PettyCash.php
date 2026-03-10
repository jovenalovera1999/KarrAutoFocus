<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class PettyCash extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_petty_cash';
    protected $primaryKey = 'petty_cash_id';
    protected $fillable = [
        'amount',
        'description',
    ];
}
