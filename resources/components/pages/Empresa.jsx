import React from 'react'
import Suscripcion from './Suscripcion';
import { Search } from 'lucide-react';

function Empresa() {
    const companies = [
        { id: 1, name: "TecuabiSoft", tel: "1234567890", rfc: "fdjke4r23", cedula: "asfsd32re3", suscripcion: "Activa", fechaRegistro: "2021-01-01", vencimiento: "2022-01-01", fechaCompra: "2021-01-01" },
        { id: 2, name: "TecuabiSoft", tel: "1234567890", rfc: "fdjke4r23", cedula: "asfsd32re3", suscripcion: "Activa", fechaRegistro: "2021-01-01", vencimiento: "2022-01-01", fechaCompra: "2021-01-01" },
        { id: 3, name: "TecuabiSoft", tel: "1234567890", rfc: "fdjke4r23", cedula: "asfsd32re3", suscripcion: "Activa", fechaRegistro: "2021-01-01", vencimiento: "2022-01-01", fechaCompra: "2021-01-01" },
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center bg-red-400 my-12 p-8">
                {/* filtros para nombre, */}
            </div>
            <h2 className="text-2xl font-bold mb-4">Lista de Empleados</h2>
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg ">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Id</th>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Telefono</th>
                            <th className="py-3 px-6 text-left">RFC</th>
                            <th className="py-3 px-6 text-left">Cedula</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6">{company.id}</td>
                                <td className="py-3 px-6">{company.name}</td>
                                <td className="py-3 px-6">{company.tel}</td>
                                <td className="py-3 px-6">{company.rfc}</td>
                                <td className="py-3 px-6">{company.cedula}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Empresa