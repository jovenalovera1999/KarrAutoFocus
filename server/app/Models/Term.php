<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Term extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_terms';
    protected $primaryKey = 'term_id';
    protected $fillable = [
        'term',
    ];

    public function payment_breakdowns() {
        return $this->hasMany(PaymentBreakdown::class, 'term_id', 'term_id');
    }
}
