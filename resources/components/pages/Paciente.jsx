import React, { useState, useEffect } from 'react'
import Config from '../layouts/PageAuth/Config';
import { Link } from 'react-router-dom';

function Paciente() {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        getAllPaciente()
    }, [])

    const getAllPaciente = async () => {
        const response = await Config.getAllPaciente()
        setPacientes(response.data)
    }

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-100 p-6 rounded-md shadow-sm mb-12">
                {/* filtros para nombre, */}
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <select
                        name=""
                        id=""
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Ordernar nombre por:</option>
                        <option value="Aventura">De la A-Z</option>
                        <option value="Aventura">De la Z-A</option>
                    </select>

                    <select
                        name=""
                        id=""
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Ordernar T.S. por:</option>
                        <option value="Aventura">A+</option>
                        <option value="Aventura">A-</option>
                        <option value="Aventura">B+</option>
                        <option value="Aventura">B-</option>
                        <option value="Aventura">AB+</option>
                        <option value="Aventura">AB-</option>
                        <option value="Aventura">O+</option>
                        <option value="Aventura">O-</option>
                    </select>

                    <select
                        name=""
                        id=""
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Ordernar Peso por:</option>
                        <option value="Aventura">DeL mayor a menor</option>
                        <option value="Aventura">DeL menor a mayor</option>
                    </select>

                    <select
                        name=""
                        id=""
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Ordernar IMC por:</option>
                        <option value="Aventura">DeL mayor a menor</option>
                        <option value="Aventura">DeL menor a mayor</option>
                    </select>

                    <select
                        name=""
                        id=""
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Ordernar Empresa por:</option>
                        <option value="Aventura">De la A-Z</option>
                        <option value="Aventura">De la Z-A</option>
                    </select>
                </div>

                <div className="w-full sm:w-auto">
                    <input
                        type="search"
                        placeholder="Buscar paciente"
                        className="h-10 px-4 w-full sm:w-64 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Lista de Pacientes</h2>
            <div className='mb-5 flex justify-end'>
                <Link to={`/${rol}/registrar-paciente`}>
                    <a href={``} className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-500 font-semibold'>Crear Nuevo</a>
                </Link>
            </div>
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Tipo de Sangre</th>
                            <th className="px-6 py-4">Peso</th>
                            <th className="px-6 py-4">IMC</th>
                            <th className="px-6 py-4 max-md:hidden">Empresa</th>
                            {(rol === 'medico' || rol === 'admin' || rol === 'recepcion') && (
                                <th className="px-6 py-4">-</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {!pacientes ? (
                            <tr className='border-b hover:bg-gray-100'>
                                <td className='px-6 py-4'><p>Cargando...</p></td>
                            </tr>
                        ) : (
                            pacientes
                                .map((paciente) => (
                                    <tr key={paciente.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">{paciente.nombre}</td>
                                        <td className="px-6 py-4">{paciente.tipo_sangre}</td>
                                        <td className="px-6 py-4">{paciente.peso}</td>
                                        <td className="px-6 py-4">{paciente.imc}</td>
                                        <td className="px-6 py-4 max-md:hidden">{paciente.empresa_id}</td>
                                        {(rol === 'medico' || rol === 'admin' || rol === 'recepcion') && (
                                            <td className="py-4 justify-around flex ">
                                                <a href="" className='font-bold text-blue-500 hover:text-blue-600 transition duration-500'>Editar</a>
                                                <a href="" className='font-bold text-red-500 hover:text-red-600 transition duration-500'>Eliminar</a>
                                            </td>
                                        )}
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Paciente