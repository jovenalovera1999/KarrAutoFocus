<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $table = 'tbl_users';
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix_name',
        'birth_date',
        'address',
        'contact_number',
        'email',
        'username',
        'password',
        'branch_id',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'password' => 'hashed',
        ];
    }

    public function branch() {
        return $this->belongsTo(Branch::class, 'branch_id', 'branch_id')->withTrashed();
    }

    public function role() {
        return $this->belongsTo(Role::class, 'role_id', 'role_id')->withTrashed();
    }
}
