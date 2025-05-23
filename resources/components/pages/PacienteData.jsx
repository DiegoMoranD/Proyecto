import React from 'react'
import Config from '../layouts/PageAuth/Config'

function PacienteData() {

    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-600/25 pb-4">Datos personales</h2>
            <div className='flex flex-wram gap-2 items-center justify-between'>
                <div>
                    <label htmlFor="" className='text-[18px] font-medium'>Nombre:</label>
                    <p>{user.name}</p>
                </div>
                <div>
                    <label htmlFor="" className='text-[18px] font-medium'>Apellido Paterno</label>
                    <p>{user.paterno}</p>
                </div>
                <div>
                    <label htmlFor="" className='text-[18px] font-medium'>Apellido Materno</label>
                    <p>{user.materno}</p>
                </div>
                <div>
                    <label htmlFor="" className='text-[18px] font-medium'>Correo</label>
                    <p>{user.email}</p>
                </div>
                <div>
                    <label htmlFor="" className='text-[18px] font-medium'>Telefono</label>
                    <p>{user.telefono}</p>
                </div>
                <div>
                    <label htmlFor="" className='text-[18px] font-medium'>Empresa Asosciada</label>
                    <p>{user.empresa_id}</p>
                </div>
            </div>
            <div>
                    <button className='cursor-pointer bg-cyan-400 p-2 rounded'>Actualizar Mis datos</button>
            </div>
        </div>
    )
}

export default PacienteData 