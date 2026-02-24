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
        'payment_detail_id',
        'payment_method_id',
        'payment_date',
        'amount',
        'description',
    ];

    public function payment_detail() {
        return $this->belongsTo(PaymentDetail::class, 'payment_detail_id', 'payment_detail_id')->withTrashed();
    }

    public function payment_method() {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id', 'payment_method_id')->withTrashed();
    }
}
