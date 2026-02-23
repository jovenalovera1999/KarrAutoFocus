<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class OfficeExpenses extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_office_expenses';
    protected $primaryKey = 'office_expense_id';
    protected $fillable = [
        'incurrence_date',
        'amount',
        'description',
    ];
}
