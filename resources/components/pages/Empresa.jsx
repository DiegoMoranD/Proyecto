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
                {/* <div>
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por ID, Nombre, Teléfono, RFC o Cédula..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        
                    </div>

                    <div>
                        <select name="" id="">

                        </select>
                    </div>
                </div> */}
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
                            <th className="py-3 px-6 text-left">Suscripcion</th>
                            <th className="py-3 px-6 text-left">Fecha de Registro</th>
                            <th className="py-3 px-6 text-left">Vencimiento</th>
                            <th className="py-3 px-6 text-left">Fecha de Compra</th>
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
                                <td className="py-3 px-6">{company.suscripcion}</td>
                                <td className="py-3 px-6">{company.fechaRegistro}</td>
                                <td className="py-3 px-6">{company.vencimiento}</td>
                                <td className="py-3 px-6">{company.fechaCompra}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Empresa