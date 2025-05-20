import React from 'react'

function TipoUsuario() {
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
            <h2 className="text-2xl font-bold mb-4">Lista de Tipo Usuario</h2>
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
                        {typeUser.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{employee.name}</td>
                                <td className="px-6 py-4">{employee.registroPaciente}</td>
                                <td className="px-6 py-4">{employee.registroMedicamento}</td>
                                <td className="px-6 py-4">{employee.agenadrCita}</td>
                                <td className="px-6 py-4">{employee.eliminarPaciente}</td>
                                <td className="px-6 py-4 max-md:hidden">{employee.eliminacita}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TipoUsuario