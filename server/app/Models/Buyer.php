<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Buyer extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_buyers';
    protected $primaryKey = 'buyer_id';
    protected $fillable = [
        'buyer',
        'address',
        'agreed_price',
        'date_reserved',
        'agent_id',
    ];

    public function agent() {
        return $this->belongsTo(Agent::class, 'agent_id', 'agent_id')->withTrashed();
    }

    public function cars() {
        return $this->hasMany(Car::class, 'buyer_id', 'buyer_id');
    }

    public function payment_details() {
        return $this->hasMany(PaymentDetail::class, 'buyer_id', 'buyer_id');
    }
}
