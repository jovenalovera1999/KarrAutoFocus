<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class TransferStatus extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_transfer_status';
    protected $primaryKey = 'transfer_status_id';
    protected $fillable = [
        'transfer_status',
    ];

    public function cars() {
        return $this->hasMany(Car::class, 'transfer_status_id', 'transfer_status_id');
    }
}
