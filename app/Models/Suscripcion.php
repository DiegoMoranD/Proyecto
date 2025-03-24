<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Suscripcion extends Model
{
    use HasFactory;

    protected $table = 'suscripcions';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'precio',
        'descuento',
        'dias'
    ];

    public function empresas()
    {
        return $this->hasMany(Empresa::class, 'suscripcionID', 'idSuscripcion');
    }
}
