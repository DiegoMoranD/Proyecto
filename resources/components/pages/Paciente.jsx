import React, { useState, useEffect } from 'react'
import Config from '../layouts/PageAuth/Config';

function Paciente() {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        getAllPaciente()
    }, [])

    const getAllPaciente = async () => {
        const response = await Config.getAllPaciente()
        setPacientes(response.data)
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center bg-red-400 my-12 p-8">
                {/* filtros para nombre, */}
                <div>
                    <select
                        name=""
                        id=""
                        className="h-8 rounded bg-[#fff] border border-white border-opacity-35 text-black"
                    >
                        <option value="">Ordernar nombre por:</option>
                        <option value="Aventura">De la A-Z</option>
                        <option value="Aventura">De la Z-A</option>
                    </select>
                </div>

                <div>
                    <select
                        name=""
                        id=""
                        className="h-8 rounded bg-[#fff] border border-white border-opacity-35 text-black"
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
                </div>

                <div>
                    <select
                        name=""
                        id=""
                        className="h-8 rounded bg-[#fff] border border-white border-opacity-35 text-black"
                    >
                        <option value="">Ordernar Peso por:</option>
                        <option value="Aventura">DeL mayor a menor</option>
                        <option value="Aventura">DeL menor a mayor</option>
                    </select>
                </div>

                <div>
                    <select
                        name=""
                        id=""
                        className="h-8 rounded bg-[#fff] border border-white border-opacity-35 text-black"
                    >
                        <option value="">Ordernar IMC por:</option>
                        <option value="Aventura">DeL mayor a menor</option>
                        <option value="Aventura">DeL menor a mayor</option>
                    </select>
                </div>

                <div>
                    <select
                        name=""
                        id=""
                        className="h-8 rounded bg-[#fff] border border-white border-opacity-35 text-black"
                    >
                        <option value="">Ordernar Empresa por:</option>
                        <option value="Aventura">De la A-Z</option>
                        <option value="Aventura">De la Z-A</option>
                    </select>
                </div>

                <div className="mr-10">
                    <input
                        type="search"
                        name=""
                        placeholder="Buscar Paciente"
                        id=""
                        className="rounded bg-[#fff] border border-white border-opacity-35 text-black"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Tipo de Sangre</th>
                            <th className="py-3 px-6 text-left">Peso</th>
                            <th className="py-3 px-6 text-left">IMC</th>
                            <th className="py-3 px-6 text-left">Empresa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!pacientes ? (
                            <tr className='border-b hover:bg-gray-100'>
                                <td className='py-3 px-6'><p>Cargando...</p></td>
                            </tr>
                        ) : (
                            pacientes
                                .map((paciente) => (
                                    <tr key={paciente.id} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-6">{paciente.nombre}</td>
                                        <td className="py-3 px-6">{paciente.tipo_sangre}</td>
                                        <td className="py-3 px-6">{paciente.peso}</td>
                                        <td className="py-3 px-6">{paciente.imc}</td>
                                        <td className="py-3 px-6">{paciente.empresa_id}</td>
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