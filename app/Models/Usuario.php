<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'USUARIO';
    protected $primaryKey = 'idUsuario';
    public $timestamps = false;

    protected $fillable = [
        'nombres',
        'apPaterno',
        'apMaterno',
        'telUsuario',
        'userName',
        'passUser',
        'tipoUsuarioID',
        'empresaID'
    ];

    // Relación muchos a uno con TIPOUSUARIO
    public function tipoUsuario()
    {
        return $this->belongsTo(Tipo_usuario::class, 'tipoUsuarioID', 'idTipoUsuario');
    }

    // Relación muchos a uno con EMPRESA
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresaID', 'idEmpresa');
    }
}
