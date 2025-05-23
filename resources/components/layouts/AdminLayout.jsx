import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import AuthUser from './PageAuth/AuthUser';
import SideBar from '../SideBar';
import TopBar from '../Topbar';
import Home from '../pages/Home';
import Empresa from '../pages/Empresa';
import TipoUsuario from '../pages/TipoUsuario';
import Suscripcion from '../pages/Suscripcion';
import Paciente from '../pages/Paciente';
import Usuario from '../pages/Usuario';
import PacientesForm from '../pages/forms/PacientesForm';
import UsuarioForm from '../pages/forms/UsuarioFrom';

function AdminLayout() {
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
        if (getRol() !== 'admin') {
            navigate('/login'); // Redirige si el rol no es "admin"
        }
    }, []);

    return (
        <main className="flex w-screen h-screen bg-gray-200">
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar toggleSidebar={toggleSidebar} />
                {/* El contenedor que debe ocupar el espacio restante y permitir scroll */}
                <section className="flex-1 overflow-y-auto bg-gray-200">
                    <div className="p-4">
                        <div className="bg-white p-4 m-4 rounded-2xl overflow-x-hidden lg:max-w-[95%] md:max-w-[95%] sm:max-w-full mx-auto max-sm:w-fixed max-lg:w-full">
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/empresa" element={<Empresa />} />
                                <Route path="/tipo-usuario" element={<TipoUsuario />} />
                                <Route path="/suscripcion" element={<Suscripcion />} />
                                <Route path="/pacientes" element={<Paciente />} />
                                <Route path="/usuario" element={<Usuario />} />
                                <Route path="/registrar-paciente" element={<PacientesForm />} />
                                <Route path="/usuario-form" element={<UsuarioForm />} />
                            </Routes>
                        </div>
                    </div>
                </section>
            </div>
        </main>

    );
}

export default AdminLayout;