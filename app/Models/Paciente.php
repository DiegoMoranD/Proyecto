<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $table = 'PACIENTE';
    protected $primaryKey = 'idPaciente';
    public $timestamps = false;

    protected $fillable = [
        'nombrePaciente',
        'fechaNac',
        'tipoSangre',
        'peso',
        'altura',
        'imc',
        'fechaRegistro',
        'usuarioRegistro',
        'empresaID'
    ];

    // Relación muchos a uno con EMPRESA
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresaID', 'idEmpresa');
    }
}