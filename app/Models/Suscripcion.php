<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Suscripcion extends Model
{
    use HasFactory;

    protected $table = 'suscripcion';
    protected $primaryKey = 'idSuscripcion';
    public $timestamps = false;

    protected $fillable = [
        'nombreSuscripcion',
        'precioSuscripcion',
        'descuentoSuscripcion',
        'diasSuscripcion'
    ];

    public function empresas()
    {
        return $this->hasMany(Empresa::class, 'suscripcionID', 'idSuscripcion');
    }
}
