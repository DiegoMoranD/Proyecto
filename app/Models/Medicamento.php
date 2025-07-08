<?php

namespace App\Models;

use App\Models\Empresa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicamento extends Model
{
    use HasFactory;

    protected $table = 'medicamentos';
    // protected $primaryKey = 'idEmpresa';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'descripcion',
        'categoria',
        'presentacion',
        'empresa_id',
        'stock',
        'receta'        
    ];

    public function empresa()
    {
        return $this->hasMany(Empresa::class, 'empresa_id', 'id');
    }
}
