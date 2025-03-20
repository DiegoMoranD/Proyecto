<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tipo_usuario extends Model
{
    use HasFactory;

    protected $table = 'TIPOUSUARIO';
    protected $primaryKey = 'idTipoUsuario';
    public $timestamps = false;

    protected $fillable = [
        'nombreTipo',
        'registroPaciente',
        'registroMedicamento',
        'agendarCita',
        'eliminarPaciente',
        'eliminarCita'
    ];

    // Relación de uno a muchos con USUARIO
    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'tipoUsuarioID', 'idTipoUsuario');
    }
}