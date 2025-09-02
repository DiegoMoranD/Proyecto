import React, { useState, useEffect } from 'react'
import Config from '../layouts/PageAuth/Config';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Paciente() {
    const [pacientes, setPacientes] = useState([]);
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [search, setSearch] = useState("");
    const [orderNombre, setOrderNombre] = useState("");
    const [orderTS, setOrderTS] = useState("");
    const [orderPeso, setOrderPeso] = useState("");
    const [orderIMC, setOrderIMC] = useState("");
    const [orderEmpresa, setOrderEmpresa] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Cambia este valor según cuántos pacientes quieras por página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPacientes = filteredPacientes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPacientes.length / itemsPerPage);


    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const getUser = () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    const rol = getRol();
    const user = getUser();

    if (rol === 'admin' || rol === 'root') {
        useEffect(() => {
            getAllPacientesByAdmin()
        }, [])

        const getAllPacientesByAdmin = async () => {
            const response = await Config.getAllPacientesByAdmin()
            setPacientes(response.data)
            setFilteredPacientes(response.data)
        }

    } else {
        useEffect(() => {
            getAllPaciente()
        }, [])

        const getAllPaciente = async () => {
            const response = await Config.getAllPaciente()
            setPacientes(response.data)
            setFilteredPacientes(response.data)
        }

    }

    const deletePaciente = async (id) => {
        // const isDelete = window.confirm("¿Desea Borrar El Paciente?");
        // if (isDelete) {
        //     try {
        //         await Config.deletePacieteByAdmin(id);
        //         const nuevosPacientes = pacientes.filter(med => med.id !== id);
        //         setPacientes(nuevosPacientes)
        //         setFilteredPacientes(nuevosPacientes)
        //         alert("Paciente eliminado exitosamente");
        //     } catch (error) {
        //         alert("Error al eliminar el paciente");
        //     }
        // }

        Swal.fire({
            title: "¿Eliminar paciente?",
            text: "¿Esta seguro de eliminar a este paciente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Config.deletePacieteByAdmin(id);
                const nuevosPacientes = pacientes.filter(med => med.id !== id);
                setPacientes(nuevosPacientes)
                setFilteredPacientes(nuevosPacientes)
                Swal.fire({
                    title: "Eliminado!",
                    text: "El paciente ha sido eliminado exitosamente.",
                    icon: "success"
                });
            }
        });
    }
    // Filtrar y ordenar pacientes
    useEffect(() => {
        let data = [...pacientes];

        // Buscar por nombre
        if (search) {
            data = data.filter(p =>
                p.nombre.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filtrar por tipo de sangre
        if (orderTS) {
            data = data.filter(p => p.tipo_sangre === orderTS);
        }

        // Ordenar por nombre
        if (orderNombre === "az") {
            data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (orderNombre === "za") {
            data.sort((a, b) => b.nombre.localeCompare(a.nombre));
        }

        // Ordenar por peso
        if (orderPeso === "mayor") {
            data.sort((a, b) => b.peso - a.peso);
        } else if (orderPeso === "menor") {
            data.sort((a, b) => a.peso - b.peso);
        }

        // Ordenar por IMC
        if (orderIMC === "mayor") {
            data.sort((a, b) => b.imc - a.imc);
        } else if (orderIMC === "menor") {
            data.sort((a, b) => a.imc - b.imc);
        }

        // Ordenar por empresa (alfabético)
        if (orderEmpresa === "az") {
            data.sort((a, b) => String(a.empresa_id).localeCompare(String(b.empresa_id)));
        } else if (orderEmpresa === "za") {
            data.sort((a, b) => String(b.empresa_id).localeCompare(String(a.empresa_id)));
        }

        setFilteredPacientes(data);
        setCurrentPage(1);
    }, [search, orderNombre, orderTS, orderPeso, orderIMC, orderEmpresa, pacientes]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-100 p-6 rounded-md shadow-sm mb-12">
                {/* filtros para nombre, */}
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={orderNombre}
                        onChange={e => setOrderNombre(e.target.value)}
                    >
                        <option value="">Ordernar nombre por:</option>
                        <option value="az">De la A-Z</option>
                        <option value="za">De la Z-A</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={orderTS}
                        onChange={e => setOrderTS(e.target.value)}
                    >
                        <option value="">Filtrar T.S. por:</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={orderPeso}
                        onChange={e => setOrderPeso(e.target.value)}
                    >
                        <option value="">Ordernar Peso por:</option>
                        <option value="mayor">Del mayor a menor</option>
                        <option value="menor">Del menor a mayor</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={orderIMC}
                        onChange={e => setOrderIMC(e.target.value)}
                    >
                        <option value="">Ordernar IMC por:</option>
                        <option value="mayor">Del mayor a menor</option>
                        <option value="menor">Del menor a mayor</option>
                    </select>

                    <select
                        className="h-10 px-4 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={orderEmpresa}
                        onChange={e => setOrderEmpresa(e.target.value)}
                    >
                        <option value="">Ordernar Empresa por:</option>
                        <option value="az">De la A-Z</option>
                        <option value="za">De la Z-A</option>
                    </select>
                </div>

                <div className="w-full sm:w-auto">
                    <input
                        type="search"
                        placeholder="Buscar paciente"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="h-10 px-4 w-full sm:w-64 rounded border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Lista de Pacientes</h2>
            <div className='mb-5 flex justify-end'>
                <Link to={`/${rol}/registrar-paciente`}>
                    <p className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-500 font-semibold'>Crear Nuevo</p>
                </Link>
            </div>
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider ">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Tipo de Sangre</th>
                            <th className="px-6 py-4">Peso</th>
                            <th className="px-6 py-4">IMC</th>
                            <th className="px-6 py-4 max-md:hidden">Empresa</th>
                            {(rol === 'medico' || rol === 'admin' || rol === 'recepcion' || rol === 'root') && (
                                <>
                                    <th className="px-6 py-4">Opciones</th>
                                    <th className="px-6 py-4">Info</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                        {currentPacientes.length === 0 ? (
                            <tr className='border-b hover:bg-gray-100'>
                                <td className='px-6 py-4' colSpan={6}><p>No hay pacientes</p></td>
                            </tr>
                        ) : (
                            currentPacientes
                                .map((paciente) => (
                                    <tr key={paciente.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">{paciente.nombre}</td>
                                        <td className="px-6 py-4">{paciente.tipo_sangre}</td>
                                        <td className="px-6 py-4">{paciente.peso}</td>
                                        <td className="px-6 py-4">{paciente.imc}</td>
                                        <td className="px-6 py-4 max-md:hidden">{paciente.empresa_id}</td>
                                        {(rol === 'medico' || rol === 'admin' || rol === 'root' || rol === 'recepcion') && (
                                            <>
                                                <td className="py-4 justify-around flex">
                                                    <Link to={`/${rol}/update-paciente/${paciente.id}`}>
                                                        <p className='font-bold text-blue-500 hover:text-blue-600 transition duration-500'>Editar</p>
                                                    </Link>
                                                    <button onClick={() => deletePaciente(paciente.id)} className='font-bold text-red-500 hover:text-red-600 transition duration-500'>Eliminar</button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link to={`/${rol}/pacientes/${paciente.id}`}>
                                                        <p className='font-bold text-blue-500 hover:text-blue-600 transition duration-500'>Ver</p>
                                                    </Link>
                                                </td>
                                            </>
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

export default Paciente;