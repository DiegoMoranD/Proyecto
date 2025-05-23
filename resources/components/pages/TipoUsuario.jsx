import React, { useState, useEffect } from 'react'
import Config from '../layouts/PageAuth/Config';

function TipoUsuario() {
    const [TipoUsuario, setTipoUsuario] = useState([]);

    useEffect(() => {
        getAllTipoUsuario()
    }, [])

    const getAllTipoUsuario = async () => {
        const response = await Config.getAllTipoUsuario();
        setTipoUsuario(response.data);
    }

    const typeUser = [
        { id: 1, name: "admin", registroPaciente: true, registroMedicamento: true, agenadrCita: true, eliminarPaciente: true, eliminacita: true, },
        { id: 2, name: "medico", registroPaciente: true, registroMedicamento: false, agenadrCita: true, eliminarPaciente: false, eliminacita: true, },
        { id: 3, name: "enfermera", registroPaciente: true, registroMedicamento: false, agenadrCita: true, eliminarPaciente: false, eliminacita: true, },
        { id: 4, name: "paciente", registroPaciente: false, registroMedicamento: false, agenadrCita: true, eliminarPaciente: false, eliminacita: true, },
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center bg-red-400 my-12 p-8">
                Seccion de filtros
            </div>
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-600/25 pb-4">Lista de Tipo Usuario</h2>
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Tipo</th>
                            <th className="px-6 py-4">Registro Paciente</th>
                            <th className="px-6 py-4">Registro Medicamento</th>
                            <th className="px-6 py-4">Agendar Cita</th>
                            <th className="px-6 py-4">Eliminar Paciente</th>
                            <th className="px-6 py-4 max-md:hidden">Eliminar Cita</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {TipoUsuario.map((tipoUser) => (
                            <tr key={tipoUser.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{tipoUser.nombre_tipo}</td>
                                <td className="px-6 py-4">{tipoUser.registro_paciente}</td>
                                <td className="px-6 py-4">{tipoUser.registro_medicamento}</td>
                                <td className="px-6 py-4">{tipoUser.agendar_cita}</td>
                                <td className="px-6 py-4">{tipoUser.eliminar_paciente}</td>
                                <td className="px-6 py-4 max-md:hidden">{tipoUser.eliminar_cita}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TipoUsuario