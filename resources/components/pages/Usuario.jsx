import React, { useState, useEffect } from 'react'
import Config from '../layouts/PageAuth/Config';
import { Link } from 'react-router-dom';

function Usuario() {
    const [user, setUsers] = useState([]);

    useEffect(() => {
        getAlltUsuarios()
    }, [])

    const getAlltUsuarios = async () => {
        const response = await Config.getAllUsuarios();
        setUsers(response.data);
    };

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-100 p-6 rounded-md shadow-sm mb-12">
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Ordenar nombre por:</option>
                        <option value="az">De la A-Z</option>
                        <option value="za">De la Z-A</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Ordenar apellido por:</option>
                        <option value="az">De la A-Z</option>
                        <option value="za">De la Z-A</option>
                    </select>
                </div>

                <div className="w-full sm:w-auto">
                    <input
                        type="search"
                        placeholder="Buscar usuario"
                        className="h-10 px-4 w-full sm:w-64 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>



            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Lista de Usuarios</h2>

            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Apellido Paterno</th>
                            <th className="px-6 py-4">Telefono</th>
                            <th className="px-6 py-4 max-md:hidden">Empresa</th>
                            {rol === 'admin' && (
                                <th className="px-6 py-4">-</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {!user ? (
                            <tr>
                                <td className="px-6 py-4" colSpan="4">Cargando...</td>
                            </tr>
                        ) : (user.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{usuario.name}</td>
                                <td className="px-6 py-4">{usuario.paterno}</td>
                                <td className="px-6 py-4">{usuario.materno}</td>
                                <td className="px-6 py-4 max-md:hidden">{usuario.empresa_id}</td>
                                {rol === 'admin' && (
                                    <td className="py-4 justify-around flex ">
                                        <Link to={`/${rol}/update-usuario/${usuario.id}`}><p className='font-bold text-blue-500 hover:text-blue-600 transition duration-500'>Editar</p></Link>
                                        <a href="" className='font-bold text-red-500 hover:text-red-600 transition duration-500'>Eliminar</a>
                                    </td>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Usuario