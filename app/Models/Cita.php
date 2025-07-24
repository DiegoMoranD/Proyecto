<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;

    protected $table = 'citas';
    // protected $primaryKey = 'idEmpresa';
    public $timestamps = true;

    protected $fillable = [
        'paciente_id',
        'motivo',
        'fecha',
        'hora',
        'estado',
        'atendido_por',
        'empresa_id',
    ];

    // Relación muchos a uno con SUSCRIPCION
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id', 'id');
    }

    // Relación muchos a uno con SUSCRIPCION
    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'paciente_id', 'id');
    }

    public function citaDetalles()
    {
        return $this->hasMany(Cita_detalles::class, 'cita_id', 'id');
    }
}
