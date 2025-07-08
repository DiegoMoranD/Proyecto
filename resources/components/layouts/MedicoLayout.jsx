import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import AuthUser from './PageAuth/AuthUser'
import SideBar from '../SideBar'
import TopBar from '../Topbar'
import Paciente from '../pages/Paciente'
import PacientesForm from '../pages/forms/PacientesForm'
import UpdatePaciente from '../pages/forms/UpdatPaciente'
import Home from '../pages/Home'
import Medicamentos from '../pages/Medicamentos'
import MedicamentoForm from '../pages/forms/MedicamentoForm'
import UpdateMedicamento from '../pages/forms/UpdateMedicamento'

function MedicoLayout() {
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
        if (getRol() !== 'medico') {
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
                                <Route path="/registrar-paciente" element={<PacientesForm />} />
                                <Route path="/update-paciente/:id" element={<UpdatePaciente />} />
                                <Route path="/medicamentos" element={<Medicamentos />} />
                                <Route path="/medicamento-form" element={<MedicamentoForm />} />
                                <Route path="/medicamento-update/:id" element={<UpdateMedicamento />} />
                            </Routes>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MedicoLayout