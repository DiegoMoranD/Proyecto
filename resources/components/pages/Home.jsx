import React from 'react'
import Process from '../imgs/process.jpg'

function Home() {
    const metrics = [
        { title: "Total Users", value: "2,543", change: "+12.5%", color: "text-green-500" },
        { title: "Total Users", value: "2,543", change: "+12.5%", color: "text-green-500" },
        { title: "Total Users", value: "2,543", change: "+12.5%", color: "text-green-500" },
        { title: "Total Users", value: "2,543", change: "+12.5%", color: "text-green-500" },
    ];

    return (
        <div className='flex flex-col p-4'>
            {/* Métricas */}
            <div className="grid gap-6 mt-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white p-6 border border-gray-900/25 rounded-lg shadow-md">
                        <p className="text-gray-500">{metric.title}</p>
                        <h3 className="text-2xl font-bold">{metric.value}</h3>
                        <span className={metric.color}>{metric.change}</span>
                    </div>
                ))}
            </div>

            {/* Dos contenedores con imagen */}
            <div className='flex flex-col md:flex-row flex-wrap gap-4 mt-6'>
                <div className='flex-1 min-w-[280px] p-6 rounded-lg shadow-md border border-gray-900/25 flex justify-center items-center'>
                    <img src={Process} alt="Proceso" className='w-24' />
                </div>
                <div className='flex-1 min-w-[280px] p-6 rounded-lg shadow-md border border-gray-900/25 flex justify-center items-center'>
                    <img src={Process} alt="Proceso" className='w-24' />
                </div>
            </div>

            {/* Imagen sola centrada */}
            <div className='mt-6'>
                <div className='border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="Proceso" className='w-24' />
                </div>
            </div>
        </div>
    );
};

export default Home