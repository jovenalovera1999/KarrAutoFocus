<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Branch extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_branches';
    protected $primaryKey = 'branch_id';
    protected $fillable = [
        'branch',
    ];

    public function users() {
        return $this->hasMany(User::class, 'branch_id', 'branch_id');
    }
}
