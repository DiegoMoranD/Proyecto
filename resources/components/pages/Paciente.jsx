import React from 'react'

function Paciente() {
    const pacientes = [
        { id: 1, name: "Paul Hernadez", nacimiento: "1990-01-01", sangre:"O", peso: "70", altura: "1.70", imc: "24.22", fechaRegistro: "2021-01-01", usuarioRegistro: "admin", empresaId: 1},
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center bg-red-400 my-12 p-8">
                Seccion de filtros
            </div>
            <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Fecha de Nacimiento</th>
                            <th className="py-3 px-6 text-left">Tipo de Sangre</th>
                            <th className="py-3 px-6 text-left">Peso</th>
                            <th className="py-3 px-6 text-left">Altura</th>
                            <th className="py-3 px-6 text-left">IMC</th>
                            <th className="py-3 px-6 text-left">Fecha de Registro</th>
                            <th className="py-3 px-6 text-left">Usuario de Registro</th>
                            <th className="py-3 px-6 text-left">Empresa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente) => (
                            <tr key={paciente.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{paciente.name}</td>
                                <td className="py-3 px-6">{paciente.nacimiento}</td>
                                <td className="py-3 px-6">{paciente.sangre}</td>
                                <td className="py-3 px-6">{paciente.peso}</td>
                                <td className="py-3 px-6">{paciente.altura}</td>
                                <td className="py-3 px-6">{paciente.imc}</td>
                                <td className="py-3 px-6">{paciente.fechaRegistro}</td>
                                <td className="py-3 px-6">{paciente.usuarioRegistro}</td>
                                <td className="py-3 px-6">{paciente.empresaId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Paciente