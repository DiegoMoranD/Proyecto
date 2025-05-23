import React from 'react'

function Suscripcion() {
    const suscripciones = [
        { id: 1, name: "Sps", precio: 100, descuento: 0, dias: 30, }, ,
    ];

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Lista de Suscripciones</h2>
            <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
                    <thead className="bg-gray-100 text-left font-semibold text-gray-700 uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4">Precio</th>
                            <th className="px-6 py-4">Descuento</th>
                            <th className="px-6 py-4">Dias</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {suscripciones.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{sub.name}</td>
                                <td className="px-6 py-4">{sub.precio}</td>
                                <td className="px-6 py-4">{sub.descuento}</td>
                                <td className="px-6 py-4">{sub.dias}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Suscripcion