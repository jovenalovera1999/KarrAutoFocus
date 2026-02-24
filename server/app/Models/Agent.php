<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Agent extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_agents';
    protected $primaryKey = 'agent_id';
    protected $fillable = [
        'agent',
    ];

    public function buyers() {
        return $this->hasMany(Buyer::class, 'agent_id', 'agent_id');
    }
}
