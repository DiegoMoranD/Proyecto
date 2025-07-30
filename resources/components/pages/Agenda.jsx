import React, { useEffect, useState } from 'react'
import CalendarView from './CalendarView'
import { Link } from 'react-router-dom'
import Config from '../layouts/PageAuth/Config'

function Agenda() {

    const [citas, setCitas] = useState([]);
    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }
    const rol = getRol();

    useEffect(() => {
        Config.getCitasSemana()
            .then(res => setCitas(res.data))
            .catch(() => setCitas([]));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Agenda de citas</h2>
            <div className='flex justify-between'>
                <div className='grid content-between w-1/4'>
                    <div className='bg-gray-100 p-4 rounded-lg h-[480px] overflow-auto'>
                        <div className='bg-white p-4 rounded-lg '>
                            <p className='border-b border-gray-600/25 mb-4 font-medium'>Actividad Reciente:</p>
                            <div className='flex justify-between'>
                                <table className='min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-gray-100 border-collapse border border-black/10'>
                                    <thead className='bg-gray-100 text-left font-medium text-gray-700 uppercase tracking-wider'>
                                        <tr>
                                            <th className="px-3 py-2">Nombre</th>
                                            <th className="px-3 py-2">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200 bg-white'>
                                        {citas.length === 0 && (
                                            <tr>
                                                <td colSpan={2} className='px-2.5 py-1.5 text-center'>Sin citas recientes</td>
                                            </tr>
                                        )}
                                        {citas.map((cita) => (
                                            <tr key={cita.id} className='hover:bg-gray-50 transition-colors'>
                                                <td className='px-2.5 py-1.5'>{cita.nombre_paciente}</td>
                                                <td className='px-2.5 py-1.5'>
                                                    {cita.estado === 'atendido' && (
                                                        <p className="py-1 text-center rounded font-semibold bg-green-100 text-green-600">Atendido</p>
                                                    )}
                                                    {cita.estado === 'registrado' && (
                                                        <p className="py-1 text-center rounded font-semibold bg-yellow-100 text-yellow-600">Registrado</p>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Link to={`/${rol}/agendar-form`} className='bg-green-500 text-white rounded-[8px] p-2 mt-6 cursor-pointer hover:bg-green-600 transition-colors duration-500 font-medium text-center'>
                        <button>Regristar Cita</button>
                    </Link>
                </div>
                <div className=''>
                    <div className=''>
                        <CalendarView></CalendarView>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Agenda