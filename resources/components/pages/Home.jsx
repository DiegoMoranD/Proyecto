import React from 'react'
import Process from '../imgs/process.jpg'

function Home() {
    const metrics = [
        { title: "Total Users", value: "2,543", change: "+12.5%", color: "text-green-500" },
        { title: "New Users", value: "185", change: "+3.2%", color: "text-green-500" },
        { title: "Active Sessions", value: "1,253", change: "-2.1%", color: "text-red-500" },
        { title: "Revenue", value: "$12,345", change: "+8.3%", color: "text-green-500" },
    ];

    return (
        <div className='flex flex-col m-8'>
            <div className="grid grid-cols-4 gap-6 mt-6 m-8">
                {metrics.map((metric, index) => (
                    <div key={index} className="bg-white p-6 border border-gray-900/25 rounded-lg shadow-md">
                        <p className="text-gray-500">{metric.title}</p>
                        <h3 className="text-2xl font-bold">{metric.value}</h3>
                        <span className={metric.color}>{metric.change}</span>
                    </div>
                ))}
            </div>

            <div className=' flex m-4 '>
                <div className='pt-6  p-6 rounded-lg w-1/3 m-4 shadow-md border border-gray-900/25 flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
                <div className='p-6 rounded-lg w-2/3 m-4 shadow-md border border-gray-900/25 flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
            </div>

            <div className='m-4'>
                <div className='border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
            </div>

            <div className='flex justify-around m-4'>
                <div className='m-4 w-1/3 border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
                <div className='m-4 w-1/3 border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
                <div className='m-4 w-1/3 border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
            </div>

            <div className='flex justify-around m-4'>
                <div className='m-4 w-1/3 border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
                <div className='m-4 w-1/3 border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
                <div className='m-4 w-1/3 border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center'>
                    <img src={Process} alt="dd" className='w-24' />
                </div>
            </div>

        </div>
    );
};

export default Home