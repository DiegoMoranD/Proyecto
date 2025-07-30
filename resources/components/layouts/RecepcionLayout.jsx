import TopBar from '../Topbar'
import SideBar from '../SideBar'
import Home from '../pages/Home'
import Agenda from '../pages/Agenda'
import Paciente from '../pages/Paciente'
import AuthUser from './PageAuth/AuthUser'
import PacienteData from '../pages/PacienteData'
import React, { useEffect, useState } from 'react'
import AgendarForm from '../pages/forms/AgendarForm'
import PacientesForm from '../pages/forms/PacientesForm'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'

function RecepcionLayout() {
    const { getRol } = AuthUser();
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        if (getRol() !== 'recepcion') {
            navigate('/login'); // Redirige si el rol no es "admin"
        }
    }, []);

    return (
        <main className="flex w-screen h-screen bg-gray-200">
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar toggleSidebar={toggleSidebar} />
                <section className="flex-1 overflow-y-auto bg-gray-200">
                    <div className='flex-1 p-4 overflow-auto'>
                        <div className="bg-white p-4 m-4 rounded-2xl overflow-x-hidden lg:max-w-[95%] md:max-w-[95%] sm:max-w-full mx-auto max-sm:w-fixed max-lg:w-full">
                            <Routes> 
                                <Route path="/home" element={<Home />} />
                                <Route path="/pacientes" element={<Paciente />} />
                                <Route path="/pacientes/:id" element={<PacienteData />} />
                                <Route path="/registrar-paciente" element={<PacientesForm />} />
                                <Route path="/agenda" element={<Agenda />} />
                                <Route path="/agendar-form" element={<AgendarForm />} />
                                <Route path="/pacientes/:id" element={<PacienteData />} />
                            </Routes>
                        </div>  
                    </div>
                </section>
            </div>
        </main>
    );
}

export default RecepcionLayout