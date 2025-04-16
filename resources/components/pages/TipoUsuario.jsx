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
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Tipo</th>   
                            <th className="py-3 px-6 text-left">Registro Paciente</th>
                            <th className="py-3 px-6 text-left">Registro Medicamento</th>
                            <th className="py-3 px-6 text-left">Agendar Cita</th>
                            <th className="py-3 px-6 text-left">Eliminar Paciente</th>
                            <th className="py-3 px-6 text-left">Eliminar Cita</th>
                        </tr>
                    </thead>
                    <tbody>
                        {typeUser.map((employee) => (
                            <tr key={employee.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{employee.name}</td>
                                <td className="py-3 px-6">{employee.registroPaciente}</td>
                                <td className="py-3 px-6">{employee.registroMedicamento}</td>
                                <td className="py-3 px-6">{employee.agenadrCita}</td>
                                <td className="py-3 px-6">{employee.eliminarPaciente}</td>
                                <td className="py-3 px-6">{employee.eliminacita}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TipoUsuario