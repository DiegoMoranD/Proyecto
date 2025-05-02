import React, { useState, useEffect } from 'react'
import Suscripcion from './Suscripcion';
import { Search } from 'lucide-react';
import Config from '../layouts/PageAuth/Config';

function Empresa() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        getAlltEmpresa()
    }, [])

    const getAlltEmpresa = async () => {
        const response = await Config.getAlltEmpresa()
        setEmpresas(response.data)
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center bg-red-400 my-12 p-8">
                {/* filtros para nombre, */}
            </div>
            <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
            <div className="overflow-y-auto max-h-96 shadow-md rounded-lg">
                <table className="min-w-full bg-white shadow-md rounded-lg ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Telefono</th>
                            <th className="py-3 px-6 text-left">RFC</th>
                            <th className="py-3 px-6 text-left max-md:hidden">Cedula</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!empresas ? (
                            <tr className='border-b hover:bg-gray-100'>
                                <td className='py-3 px-6'><p>Cargando...</p></td>
                            </tr>
                        ) : (
                            empresas
                                .map((empresa) => (
                                    <tr key={empresa.id} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-6">
                                            {empresa.nombre}
                                        </td>
                                        <td className="py-3 px-6">{empresa.telefono}</td>
                                        <td className="py-3 px-6">{empresa.rfc}</td>
                                        <td className="py-3 px-6">{empresa.cedula}</td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Empresa