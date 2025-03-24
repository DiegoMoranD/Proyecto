<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $table = 'pacientes';
    // protected $primaryKey = 'idPaciente';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'fecha_nacimiento',
        'tipo_sangre',
        'peso',
        'altura',
        'imc',
        'fecha_registro',
        'empresaID'
    ];

    // Relación muchos a uno con EMPRESA
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresaID', 'idEmpresa');
    }
}