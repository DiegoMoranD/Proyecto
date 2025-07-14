import React, { useState, useEffect } from 'react';
import Config from '../layouts/PageAuth/Config';
import { Link } from 'react-router-dom';

function Empresa() {
    const [empresas, setEmpresas] = useState([]);
    const [filteredEmpresas, setFilteredEmpresa] = useState([]);
    const [search, setSearch] = useState("");
    const [orderNombre, setOrderNombre] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmpresas = filteredEmpresas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredEmpresas.length / itemsPerPage);

    useEffect(() => {
        getAlltEmpresa()
    }, [])

    const getAlltEmpresa = async () => {
        const response = await Config.getAlltEmpresa();
        setEmpresas(response.data);
        setFilteredEmpresa(response.data);
    };

    const deleteEmpresa = async (id) => {
        const isDelete = window.confirm("¿Desea Borrar La Empresa?");
        if (isDelete) {
            await Config.deleteEmpresaByRoot(id);
            getAlltEmpresa();
        }
    }

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    useEffect(() => {
        let data = [...empresas];

        // Buscar por nombre
        if (search) {
            data = data.filter(p =>
                p.nombre.toLowerCase().includes(search.toLowerCase())
            );
        }


        // Ordenar por nombre
        if (orderNombre === "az") {
            data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (orderNombre === "za") {
            data.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }


        setFilteredEmpresa(data);
    }, [search, orderNombre, empresas]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-100 p-6 rounded-md shadow-sm mb-12">
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <select
                        value={orderNombre}
                        onChange={e => setOrderNombre(e.target.value)}
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
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar empresa"
                        className="h-10 px-4 w-full sm:w-64 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-600/25 pb-4">Lista de Empresas</h2>
            {(rol === 'root') && (
                <div className='mb-5 flex justify-end'>
                    <Link to={`/${rol}/crear-empresa`}>
                        <p className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-500 font-semibold'>Crear Nuevo</p>
                    </Link>
                </div>
            )}
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Teléfono</th>
                            <th className="px-6 py-4">RFC</th>
                            <th className="px-6 py-4 max-md:hidden">Cédula</th>
                            {(rol === 'admin' || rol === 'root') && (
                                <th className="px-6 py-4">Opciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {!currentEmpresas ? (
                            <tr>
                                <td className="px-6 py-4" colSpan="4">Cargando...</td>
                            </tr>
                        ) : (
                            currentEmpresas.map((empresa) => (
                                <tr key={empresa.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{empresa.nombre}</td>
                                    <td className="px-6 py-4">{empresa.telefono}</td>
                                    <td className="px-6 py-4">{empresa.rfc}</td>
                                    <td className="px-6 py-4 max-md:hidden">{empresa.cedula}</td>
                                    {(rol === 'admin' || rol === 'root') && (
                                        <td className="py-4 justify-around flex ">
                                            <Link to={`/${rol}/update-empresa/${empresa.id}`}>
                                                <p className='font-bold text-blue-500 hover:text-blue-600 transition duration-500'>Editar</p>
                                            </Link>
                                            <button onClick={() => deleteEmpresa(empresa.id)} className='font-bold text-red-500 hover:text-red-600 transition duration-500'>Eliminar</button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Anterior
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Empresa