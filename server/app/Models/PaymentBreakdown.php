<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class PaymentBreakdown extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_payment_breakdowns';
    protected $primaryKey = 'payment_breakdown_id';
    protected $fillable = [
        'car_id',
        'buyer_id',
        'downpayment',
        'processing_fee',
        'service_fee',
        'transfer',
        'finance_id',
        'loan_amount',
        'term_id',
    ];

    public function car() {
        return $this->belongsTo(Car::class, 'car_id', 'car_id')->withTrashed();
    }

    public function buyer() {
        return $this->belongsTo(Buyer::class, 'buyer_id', 'buyer_id')->withTrashed();
    }

    public function finance() {
        return $this->belongsTo(Finance::class, 'finance_id', 'finance_id')->withTrashed();
    }

    public function term() {
        return $this->belongsTo(Term::class, 'term_id', 'term_id')->withTrashed();
    }

    public function payments() {
        return $this->hasMany(Payment::class, 'payment_detail_id', 'payment_detail_id');
    }
}
