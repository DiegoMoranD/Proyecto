<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receta extends Model
{
    use HasFactory;

    protected $table = 'receta';
    // protected $primaryKey = 'idEmpresa';
    public $timestamps = true;

    protected $fillable = [
        'paciente_id',
        'fecha_receta',
        'hora_receta',
        'usuario_receta',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class, 'paciente_id', 'id');
    }

    public function receta()
    {
        return $this->hasMany(Receta_detalles::class, 'receta_id', 'id');
    }
}
