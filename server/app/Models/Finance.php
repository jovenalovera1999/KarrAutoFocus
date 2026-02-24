<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Finance extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_finances';
    protected $primaryKey = 'finance_id';
    protected $fillable = [
        'finance',
    ];

    public function payment_details() {
        return $this->hasMany(PaymentDetail::class, 'finance_id', 'finance_id');
    }
}
