<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita_detalles extends Model
{
    use HasFactory;

    use HasFactory;

    protected $table = 'cita_detalles';
    // protected $primaryKey = 'idEmpresa';
    public $timestamps = true;

    protected $fillable = [
        'cita_id',
        'peso',
        'altura',
        'imc',
        'sintomas',
        'alergias',
        'diagnostico',
        'recomendaciones',
        'atendido_por',
    ];

    public function cita()
    {
        return $this->belongsTo(Cita::class, 'cita_id', 'id');
    }
}
