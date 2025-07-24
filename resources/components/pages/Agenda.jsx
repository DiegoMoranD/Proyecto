import React from 'react'
import CalendarView from './CalendarView'
import { Link } from 'react-router-dom' 

function Agenda() {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Agenda de citas</h2>
            <div className='flex justify-between'>
                <div className='flex flex-col w-1/4'>
                    <div className='bg-gray-200 p-12 rounded-lg'>
                        Apartado de filtros
                    </div>
                    <Link to={'/medico/agendar-form'} className='bg-green-500 text-white rounded-[8px] p-2 mt-6 cursor-pointer hover:bg-green-600 transition-colors duration-500 font-medium text-center'>
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