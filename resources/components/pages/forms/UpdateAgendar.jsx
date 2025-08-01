import React, { useState, useEffect } from 'react'
import Config from '../../layouts/PageAuth/Config';
import { Link, useParams, useNavigate } from 'react-router-dom';

function UpdateAgendar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const response = await Config.getCitaById(id);
                const data = response.data;
                setFecha(data.fecha || "");
                setHora(data.hora || "");
                setMotivo(data.motivo || "");
                if (response.data.paciente_id) {
                    const pacienteResp = await Config.getPacienteById(response.data.paciente_id);
                    setNombre(pacienteResp.data.nombre || "");
                }
            } catch (error) {
                console.error("Error al obtener la cita", error);
            }
        };
        fetchEmpresa();
    }, [id]);

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Config.updateCita(id, {
                fecha,
                hora,
                motivo,
            });
            if (response.status === 201 || response.status === 200) {
                alert("Cita actualizada exitosamente");
                navigate(`/${rol}/agenda`)
            }
        } catch (error) {
            alert("Error al actualizar la empresa o no se cambio todo los campos");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 border-gray-600/25">
                Agendar Consulta
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Paciente */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Paciente
                        </label>
                        <input
                            name="paciente_id"
                            readOnly
                            value={nombre}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-100/50">
                        </input>
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="fecha"
                            value={fecha}
                            onChange={e => setFecha(e.target.value)}
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
                            value={hora}
                            onChange={e => setHora(e.target.value)}
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
                            onChange={e => setMotivo(e.target.value)}
                            value={motivo}
                            name="motivo"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Botón de Enviar */}
                <div className="mt-12 text-center">
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