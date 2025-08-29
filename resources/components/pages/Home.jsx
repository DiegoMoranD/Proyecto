import React, { useEffect, useState } from 'react'
import Config from '../layouts/PageAuth/Config'
import Process from '../imgs/process.jpg'
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);
import Swal from 'sweetalert2';

function Home() {
    const [metrics, setMetrics] = useState([
        { title: "Usuarios", value: "-", color: "text-blue-500" },
        { title: "Pacientes", value: "-", color: "text-green-500" },
        { title: "Empresas", value: "-", color: "text-purple-500" },
    ]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await Config.getDashboardMetrics();
                setMetrics([
                    { title: "Usuarios", value: res.data.totalUsers, color: "text-blue-500" },
                    { title: "Pacientes", value: res.data.totalPacientes, color: "text-green-500" },
                    { title: "Empresas", value: res.data.totalEmpresas, color: "text-purple-500" },
                ]);
            } catch (error) {
                console.error("Error al obtener métricas", error);
            }
        };
        fetchMetrics();
    }, []);

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

    const [usersByRole, setUsersByRole] = useState([]);

    useEffect(() => {
        const fetchUsersByRole = async () => {
            try {
                const res = await Config.getUsersByRole();
                setUsersByRole(res.data);
            } catch (error) {
                console.error("Error al obtener usuarios por rol", error);
            }
        };
        fetchUsersByRole();
    }, []);

    const [pacienteMetrics, setPacienteMetrics] = useState(null);

    useEffect(() => {
        const fetchPacienteMetrics = async () => {
            try {
                const res = await Config.getPacienteMetrics();
                setPacienteMetrics(res.data);
            } catch (error) {
                console.error("Error al obtener métricas de pacientes", error);
            }
        };
        fetchPacienteMetrics();
    }, []);

    const imcData = pacienteMetrics ? {
        labels: Object.keys(pacienteMetrics.imc),
        datasets: [{
            label: 'Clasificación IMC',
            data: Object.values(pacienteMetrics.imc),
            backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#f472b6'],
        }]
    } : null;

    const sangreData = pacienteMetrics ? {
        labels: Object.keys(pacienteMetrics.tipos_sangre),
        datasets: [{
            label: 'Tipos de Sangre',
            data: Object.values(pacienteMetrics.tipos_sangre),
            backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15', '#818cf8'],
        }]
    } : null;

    const edadData = pacienteMetrics ? {
        labels: Object.keys(pacienteMetrics.edades),
        datasets: [{
            label: 'Clasificación de Edades',
            data: Object.values(pacienteMetrics.edades),
            backgroundColor: ['#fbbf24', '#60a5fa', '#34d399', '#a78bfa'],
        }]
    } : null;

    const openAlert = async () => {
        Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "success"
        });
    }

    return (
        <div className='flex flex-col p-4'>


            {(rol === 'admin' || rol === 'root') && (
                <>
                    {/* Métricas */}
                    <div className="grid gap-6 mt-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                        {metrics.map((metric, index) => (
                            <div key={index} className="bg-white p-6 border border-gray-900/25 rounded-lg shadow-md">
                                <p className="text-gray-600">{metric.title}</p>
                                <h3 className={`text-2xl font-bold ${metric.color}`}>{metric.value}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className='flex flex-col md:flex-row flex-wrap gap-4 mt-6'>
                <div className='flex-1 min-w-[280px] p-6 rounded-lg shadow-md border border-gray-900/25 flex justify-center items-center'>
                    <div className="w-full max-w-xl">
                        <p className=' text-[20px] mb-5 text-gray-600 font-[500] text-center'>Clasificacion del IMC.</p>
                        {imcData && <Bar data={imcData} options={{ responsive: true, plugins: { legend: { display: false } } }} />}
                    </div>
                </div>
                <div className='flex-1 min-w-[280px] p-6 rounded-lg shadow-md border border-gray-900/25 flex justify-center items-center'>
                    <div className="w-full max-w-xl">
                        <p className=' text-[20px] mb-5 text-gray-600 font-[500] text-center'>Edades de los pacientes.</p>
                        {edadData && <Bar data={edadData} options={{ responsive: true, plugins: { legend: { display: false } } }} />}
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <div className='w-full max-h-xl border border-gray-900/25 p-6 rounded-lg shadow-md flex justify-center items-center '>
                    <div>
                        <p className=' text-[20px] mb-5 text-gray-600 font-[500] text-center'>Tipos de Sangre.</p>

                        {sangreData && <Doughnut data={sangreData} options={{ responsive: true, }} />}
                    </div>
                </div>
            </div>

            <div>
                <button onClick={openAlert} className='bg-blue-500 text-white hover:bg-blue-600 rounded m-4 py-2 px-4'>alert</button>
            </div>
        </div>
    );
};

export default Home