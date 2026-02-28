<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Payment extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_payments';
    protected $primaryKey = 'payment_id';
    protected $fillable = [
        'car_id',
        'buyer_id',
        'payment_breakdown_id',
        'payment_method_id',
        'payment_date',
        'amount',
        'description',
    ];

    public function car() {
        return $this->belongsTo(Car::class, 'car_id', 'car_id')->withTrashed();
    }

    public function buyer() {
        return $this->belongsTo(Buyer::class, 'buyer_id', 'buyer_id')->withTrashed();
    }

    public function payment_breakdown() {
        return $this->belongsTo(PaymentBreakdown::class, 'payment_breakdown_id', 'payment_breakdown_id')->withTrashed();
    }

    public function payment_method() {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id', 'payment_method_id')->withTrashed();
    }
}
