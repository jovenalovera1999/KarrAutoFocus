<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class PaymentMethod extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_payment_methods';
    protected $primaryKey = 'payment_method_id';
    protected $fillable = [
        'payment_method',
    ];

    public function payments() {
        return $this->hasMany(Payment::class, 'payment_method_id', 'payment_method_id');
    }
}
