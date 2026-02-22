<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Expense extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_expenses';
    protected $primaryKey = 'expense_id';
    protected $fillable = [
        'incurrence_date',
        'amount',
        'description',
    ];
}
