import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Config from '../layouts/PageAuth/Config';
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
import { CalendarClockIcon, CalendarPlus2Icon, UserPlus2Icon } from 'lucide-react';

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
            // backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#facc15', '#818cf8'],
            backgroundColor: ['#fa0000', '#e10000', '#c80000', '#af0000', '#960000', '#7d0000', '#640000', '#4b0000'],
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

    // ? <--------------------------------------- Metricas de medico --------------------------------------->

    const [medicoMetrics, setMedicoMetrics] = useState({
        citasPorAtender: 0,
        citasAtendidasHoy: 0,
        pacientesNuevosMes: 0,
    });

    useEffect(() => {
        const fetchMedicoMetrics = async () => {
            try {
                // Obtener todas las citas de la empresa del médico
                const citasRes = await Config.indexAgenda();
                const citas = citasRes.data || [];

                // Obtener todos los pacientes de la empresa del médico
                const pacientesRes = await Config.getAllPaciente();
                const pacientes = pacientesRes.data || [];

                // Fecha actual y mes actual
                const hoy = new Date();
                const hoyStr = hoy.toISOString().slice(0, 10);
                const mesActual = hoy.getMonth() + 1;
                const añoActual = hoy.getFullYear();

                // Citas por atender (estado === 'registrado')
                const citasPorAtender = citas.filter(cita => cita.estado === 'registrado').length;

                // Citas atendidas del día (estado === 'atendido' y fecha === hoy)
                const citasAtendidasHoy = citas.filter(cita =>
                    cita.estado === 'atendido' &&
                    cita.fecha === hoyStr
                ).length;

                // Pacientes nuevos del mes (fecha_registro en el mes y año actual)
                const pacientesNuevosMes = pacientes.filter(paciente => {
                    if (!paciente.fecha_registro) return false;
                    const fecha = new Date(paciente.fecha_registro);
                    return (
                        fecha.getMonth() + 1 === mesActual &&
                        fecha.getFullYear() === añoActual
                    );
                }).length;

                setMedicoMetrics({
                    citasPorAtender,
                    citasAtendidasHoy,
                    pacientesNuevosMes,
                });
            } catch (error) {
                console.error("Error al obtener métricas de médico", error);
            }
        };

        if (rol === 'medico') {
            fetchMedicoMetrics();
        }
    }, [rol]);

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

            {(rol === 'medico') && (
                <>
                    <div className="grid gap-6 mt-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                        <div className="bg-white p-6 border border-gray-900/25 rounded-lg shadow-md">
                            <div className='flex justify-between'>
                                <p className="text-gray-600 font-medium text-xl">Citas por atender</p>
                                <CalendarClockIcon className='size-6'></CalendarClockIcon>
                            </div>
                            <h3 className="text-2xl font-bold text-blue-500">{medicoMetrics.citasPorAtender}</h3>
                        </div>
                        <div className="bg-white p-6 border border-gray-900/25 rounded-lg shadow-md">
                            <div className='flex justify-between'>
                                <p className="text-gray-600 font-medium text-xl">Citas atendidas del día</p>
                                <CalendarPlus2Icon className='size-6'></CalendarPlus2Icon>
                            </div>
                            <h3 className="text-2xl font-bold text-green-500">{medicoMetrics.citasAtendidasHoy}</h3>
                        </div>
                        <div className="bg-white p-6 border border-gray-900/25 rounded-lg shadow-md">
                            <div className='flex justify-between'>
                                <p className="text-gray-600 font-medium text-xl">Pacientes nuevos del mes</p>
                                <UserPlus2Icon className='size-6'></UserPlus2Icon>
                            </div>
                            <h3 className="text-2xl font-bold text-purple-500">{medicoMetrics.pacientesNuevosMes}</h3>
                        </div>
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
        </div>
    );
};

export default Home