import React from 'react'

function Users() {
    const employees = [
        { id: 1, name: "Juan Pérez", role: "Desarrollador", email: "juan.perez@example.com", status: "Activo" },
        { id: 2, name: "Ana Gómez", role: "Diseñadora UX", email: "ana.gomez@example.com", status: "Inactivo" },
        { id: 3, name: "Carlos Rodríguez", role: "Gerente de Proyecto", email: "carlos.rodriguez@example.com", status: "Activo" },
        { id: 4, name: "María López", role: "QA Tester", email: "maria.lopez@example.com", status: "Activo" }
    ];

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Cargo</th>
                            <th className="py-3 px-6 text-left">Correo</th>
                            <th className="py-3 px-6 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{employee.name}</td>
                                <td className="py-3 px-6">{employee.role}</td>
                                <td className="py-3 px-6">{employee.email}</td>
                                <td className={`py-3 px-6 font-semibold ${employee.status === "Activo" ? "text-green-600" : "text-red-600"}`}>
                                    {employee.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Users