import React from 'react'

function Usuario() {
    const user = [
        { id: 1, name: "Juan Pérez", apPaterno: "Pérez", apMaterno: "Pérez", telefono: "1234567890", username: "juan.perez", passUser: "dsf234" , tipoUser: "Administrador", empresaId: 1},
        { id: 2, name: "Ana Gómez", apPaterno: "Gómez", apMaterno: "Gómez", telefono: "1234567890", username: "ana.gomez", passUser: "dsf234" , tipoUser: "Usuario", empresaId: 2},
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center bg-red-400 my-12 p-8">
                Seccion de filtros
            </div>
            <h2 className="text-2xl font-bold mb-4">Lista de usuarios</h2>
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Apellido Paterno</th>
                            <th className="py-3 px-6 text-left">Apellido Materno</th>
                            <th className="py-3 px-6 text-left">Telefono</th>
                            <th className="py-3 px-6 text-left">Usuario</th>
                            <th className="py-3 px-6 text-left">Contraseña</th>
                            <th className="py-3 px-6 text-left">Tipo de Usuario</th>
                            <th className="py-3 px-6 text-left">Empresa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((employee) => (
                            <tr key={employee.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{employee.name}</td>
                                <td className="py-3 px-6">{employee.apPaterno}</td>
                                <td className="py-3 px-6">{employee.apMaterno}</td>
                                <td className="py-3 px-6">{employee.telefono}</td>
                                <td className="py-3 px-6">{employee.username}</td>
                                <td className="py-3 px-6">{employee.passUser}</td>
                                <td className="py-3 px-6">{employee.tipoUser}</td>
                                <td className="py-3 px-6">{employee.empresaId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Usuario