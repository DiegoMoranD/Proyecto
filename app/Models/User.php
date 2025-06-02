<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'paterno',
        'materno',
        'email',
        'password',
        'telefono',
        'username',
        'remember_token',
        'tocken_acceso_expiracion',
        'tipo_usuario_id',
        'empresa_id',
    ];

    public function tipoUsuario()
    {
        return $this->belongsTo(Tipo_usuario::class, 'tipo_usuario_id', 'id');
    }

    // Relación muchos a uno con EMPRESA
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id', 'id'); 
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
