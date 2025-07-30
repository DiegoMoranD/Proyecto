import React, { useState, useEffect } from 'react'
import Config from '../../layouts/PageAuth/Config';
import { Link } from 'react-router-dom';

function UpdateAgendar() {
    const [paciente, setPacientes] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Agendar Consulta
            </h2>

            <form >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Paciente */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Paciente
                        </label>
                        <select
                            name="paciente_id"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="">Seleccionar</option>
                            
                        </select>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="fecha"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Hora */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Hora
                        </label>
                        <input
                            type="time"
                            name="hora"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Motivo */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Motivo
                        </label>
                        <input
                            type="text"
                            name="motivo"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Botón de Enviar */}
                <div className="mt-12 text-center">
                    <Link to={`/${rol}/registrar-paciente`}>
                        <button className='bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition mr-4'>
                            Registrar nuevo Paciente
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                    >
                        Guardar Cita
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateAgendar