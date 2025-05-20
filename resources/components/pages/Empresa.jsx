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
        const response = await Config.getAlltEmpresa();
        setEmpresas(response.data);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-100 p-6 rounded-md shadow-sm mb-12">
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Ordenar empresa por:</option>
                        <option value="az">De la A-Z</option>
                        <option value="za">De la Z-A</option>
                    </select>
                </div>

                <div className="w-full sm:w-auto">
                    <input
                        type="search"
                        placeholder="Buscar empresa"
                        className="h-10 px-4 w-full sm:w-64 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Lista de Empresas</h2>
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Teléfono</th>
                            <th className="px-6 py-4">RFC</th>
                            <th className="px-6 py-4 max-md:hidden">Cédula</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {!empresas ? (
                            <tr>
                                <td className="px-6 py-4" colSpan="4">Cargando...</td>
                            </tr>
                        ) : (
                            empresas.map((empresa) => (
                                <tr key={empresa.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{empresa.nombre}</td>
                                    <td className="px-6 py-4">{empresa.telefono}</td>
                                    <td className="px-6 py-4">{empresa.rfc}</td>
                                    <td className="px-6 py-4 max-md:hidden">{empresa.cedula}</td>
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