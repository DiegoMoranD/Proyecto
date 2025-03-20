<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'EMPRESA';
    protected $primaryKey = 'idEmpresa';
    public $timestamps = false;

    protected $fillable = [
        'nombreEmpresa',
        'telEmpresa',
        'rfcEmpresa',
        'cedulaEmpresa',
        'suscripcionID',
        'fechaRegistro',
        'vencimientoSuscripcion',
        'fechaCompraSus'
    ];

    // Relación muchos a uno con SUSCRIPCION
    public function suscripcion()
    {
        return $this->belongsTo(Suscripcion::class, 'suscripcionID', 'idSuscripcion');
    }

    // Relación de uno a muchos con USUARIO
    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'empresaID', 'idEmpresa');
    }

    // Relación de uno a muchos con PACIENTE
    public function pacientes()
    {
        return $this->hasMany(Paciente::class, 'empresaID', 'idEmpresa');
    }
}