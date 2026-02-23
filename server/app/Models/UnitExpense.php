<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class UnitExpense extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_unit_expenses';
    protected $primaryKey = 'unit_expense_id';
    protected $fillable = [
        'car_id',
        'amount',
        'description',
    ];

    public function car() {
        return $this->belongsTo(Car::class, 'car_id', 'car_id')->withTrashed();
    }
}
