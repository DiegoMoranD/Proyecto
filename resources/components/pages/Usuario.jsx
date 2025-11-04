import React, { useState, useEffect } from 'react'
import Config from '../layouts/PageAuth/Config';
import { Link } from 'react-router-dom';

function Usuario() {
    const [user, setUsers] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [search, setSearch] = useState("");
    const [orderNombre, setOrderNombre] = useState("");
    const [orderApellido, setOrderApellido] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsuarios = filteredUser.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

    useEffect(() => {
        getAlltUsuarios()
    }, [])

    const getAlltUsuarios = async () => {
        const response = await Config.getAllUsuarios();
        setUsers(response.data);
        setFilteredUser(response.data)
    };

    const deleteUsuario = async (id) => {
        const isDelete = window.confirm("¿Desea Borrar Al Usuario?");
        if (isDelete) {
            await Config.deleteUsuarioByRoot(id);
            getAlltUsuarios();
        }
    }

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    useEffect(() => {
        let data = [...user];

        // Buscar por nombre
        if (search) {
            data = data.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }


        // Ordenar por nombre
        if (orderNombre === "az") {
            data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (orderNombre === "za") {
            data.sort((a, b) => b.name.localeCompare(a.name));
        }

        if (orderApellido === "az") {
            data.sort((a, b) => a.paterno.localeCompare(b.paterno));
        } else if (orderApellido === "za") {
            data.sort((a, b) => b.paterno.localeCompare(a.paterno));
        }

        setFilteredUser(data);
    }, [search, orderNombre, orderApellido, user]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-center justify-between bg-gray-100 p-6 rounded-md shadow-sm mb-12">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full lg:w-auto justify-center sm:justify-start">
                    <select
                        value={orderNombre}
                        onChange={e => setOrderNombre(e.target.value)}
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>Ordenar nombre por:</option>
                        <option value="az">De la A-Z</option>
                        <option value="za">De la Z-A</option>
                    </select>

                    <select
                        value={orderApellido}
                        onChange={e => setOrderApellido(e.target.value)}

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
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar usuario"
                        className="h-10 px-4 w-full sm:w-64 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>



            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Lista de Usuarios</h2>
            {(rol === 'root') && (
                <div className='mb-5 flex justify-end'>
                    <Link to={`/${rol}/registrar-usuario`}>
                        <p className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-500 font-semibold'>Crear Nuevo</p>
                    </Link>
                </div>
            )}
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Apellido Paterno</th>
                            <th className="px-6 py-4">Telefono</th>
                            <th className="px-6 py-4 max-md:hidden">Empresa</th>
                            {(rol === 'admin' || rol === 'root') && (
                                <th className="px-6 py-4">Opciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {!currentUsuarios ? (
                            <tr>
                                <td className="px-6 py-4" colSpan="4">Cargando...</td>
                            </tr>
                        ) : (currentUsuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{usuario.name}</td>
                                <td className="px-6 py-4">{usuario.paterno}</td>
                                <td className="px-6 py-4">{usuario.materno}</td>
                                <td className="px-6 py-4 max-md:hidden">{usuario.empresa_id}</td>
                                {(rol === 'admin' || rol === 'root') && (
                                    <td className="py-4 justify-around flex ">
                                        <Link to={`/${rol}/update-usuario/${usuario.id}`}><p className='font-bold text-blue-500 hover:text-blue-600 transition duration-500'>Editar</p></Link>
                                        <button onClick={() => deleteUsuario(usuario.id)} className='font-bold text-red-500 hover:text-red-600 transition duration-500'>Eliminar</button>
                                    </td>
                                )}
                            </tr>
                        )))}
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
export default Usuario