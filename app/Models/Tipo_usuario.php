<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;

class Tipo_usuario extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'tipo_usuarios';
    // protected $primaryKey = 'idTipoUsuario';
    public $timestamps = false;

    protected $fillable = [
        'nombre_tipo',
        'registro_paciente',
        'registro_medicamento',
        'agendar_cita',
        'eliminar_paciente',
        'eliminar_cita'
    ];

    // Relación de uno a muchos con USUARIO
    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'tipoUsuarioID', 'idTipoUsuario');
    }
}