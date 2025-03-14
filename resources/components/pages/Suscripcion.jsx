import React from 'react'

function Suscripcion() {
    const suscripciones = [
        { id: 1, name: "Sps", precio: 100, descuento: 0, dias: 30, }, ,
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center bg-red-400 my-12 p-8">
                Seccion de filtros
            </div>
            <h2 className="text-2xl font-bold mb-4">Lista de Suscripciones</h2>
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Precio</th>
                            <th className="py-3 px-6 text-left">Descuento</th>
                            <th className="py-3 px-6 text-left">Dias</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suscripciones.map((sub) => (
                            <tr key={sub.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{sub.name}</td>
                                <td className="py-3 px-6">{sub.precio}</td>
                                <td className="py-3 px-6">{sub.descuento}</td>
                                <td className="py-3 px-6">{sub.dias}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Suscripcion