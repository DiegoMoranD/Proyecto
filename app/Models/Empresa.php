<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresas';
    // protected $primaryKey = 'idEmpresa';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'correo',
        'telefono',
        'rfc',
        'tocken_acceso',
        'cuenta_valida',
        'cedula',
        'suscripcion_id',
        'fecha_registro',
        'fecha_vencimiento',
        'tocken_acceso_expiracion',
        'fecha_compra'
    ];

    // Relación muchos a uno con SUSCRIPCION
    public function suscripcion()
    {
        return $this->belongsTo(Suscripcion::class, 'suscripcion_id', 'id');
    }

    // Relación de uno a muchos con USUARIO
    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'empresa_id', 'id');
    }

    // Relación de uno a muchos con PACIENTE
    public function pacientes()
    {
        return $this->hasMany(Paciente::class, 'empresa_id', 'id');
    }
}