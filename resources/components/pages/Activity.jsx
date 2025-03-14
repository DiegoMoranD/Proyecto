import React from 'react'

function Activity() {
    const activities = [
        { id: 1, employee: "Juan Pérez", activity: "Revisión de código", date: "2025-03-12", status: "Completado" },
        { id: 2, employee: "Ana Gómez", activity: "Diseño de interfaz", date: "2025-03-11", status: "Pendiente" },
        { id: 3, employee: "Carlos Rodríguez", activity: "Planificación de sprint", date: "2025-03-10", status: "En progreso" },
        { id: 4, employee: "María López", activity: "Pruebas de software", date: "2025-03-09", status: "Completado" }
    ];

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Actividad Reciente</h2>
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Empleado</th>
                            <th className="py-3 px-6 text-left">Actividad</th>
                            <th className="py-3 px-6 text-left">Fecha</th>
                            <th className="py-3 px-6 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr key={activity.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{activity.employee}</td>
                                <td className="py-3 px-6">{activity.activity}</td>
                                <td className="py-3 px-6">{activity.date}</td>
                                <td className={`py-3 px-6 font-semibold ${activity.status === "Completado" ? "text-green-600" :
                                        activity.status === "En progreso" ? "text-yellow-600" :
                                            "text-red-600"}`}
                                >
                                    {activity.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Activity