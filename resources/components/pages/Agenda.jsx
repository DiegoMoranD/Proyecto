import React from 'react'

function Agenda() {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-5 border-b border-gray-600/25 pb-4">Agenda de citas</h2>
            <div className='flex justify-between'>
                <div className='flex flex-col w-1/4'>
                    <div className='bg-gray-200 p-12'>
                        Apartado de filtros
                    </div>
                    <button className='bg-green-500 text-white rounded-2xl p-2 mt-6'>Regristar Cita</button>
                </div>
                <div>
                    <div className='bg-orange-300 p-12'>
                        Calendar Api
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Agenda