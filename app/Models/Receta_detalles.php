<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receta_detalles extends Model
{
    use HasFactory;

    protected $table = 'receta_detalles';
    // protected $primaryKey = 'idEmpresa';
    public $timestamps = true;

    protected $fillable = [
        'medicamento_id',
        'receta_id',
        'indicaciones',
    ];

    public function receta()
    {
        return $this->belongsTo(Receta::class, 'paciente_id', 'id');
    }
    public function medicamento()
    {
        return $this->hasMany(Medicamento::class, 'medicamento_id', 'id');
    }
}
