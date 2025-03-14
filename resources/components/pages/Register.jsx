import React from 'react'

function Register() {
    const records = [
        { id: 1, employee: "Juan Pérez", action: "Inicio de sesión", date: "2025-03-12 08:30 AM", status: "Exitoso" },
        { id: 2, employee: "Ana Gómez", action: "Cambio de contraseña", date: "2025-03-11 10:15 AM", status: "Exitoso" },
        { id: 3, employee: "Carlos Rodríguez", action: "Intento de acceso", date: "2025-03-10 06:45 PM", status: "Fallido" },
        { id: 4, employee: "María López", action: "Cierre de sesión", date: "2025-03-09 04:20 PM", status: "Exitoso" }
    ];

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Registros de Actividad</h2>
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Empleado</th>
                            <th className="py-3 px-6 text-left">Acción</th>
                            <th className="py-3 px-6 text-left">Fecha</th>
                            <th className="py-3 px-6 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{record.employee}</td>
                                <td className="py-3 px-6">{record.action}</td>
                                <td className="py-3 px-6">{record.date}</td>
                                <td className={`py-3 px-6 font-semibold ${record.status === "Exitoso" ? "text-green-600" : "text-red-600"}`}>
                                    {record.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Register