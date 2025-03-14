import React from 'react'
import Home from './pages/Home';
import Users from './pages/Users';
import Login from './pages/Login';
import Empresa from './pages/Empresa';
import Usuario from './pages/Usuario';
import Paciente from './pages/Paciente';
import CreateForm from './pages/CreateForm';
import Suscripcion from './pages/Suscripcion';
import TipoUsuario from './pages/TipoUsuario';
import { Routes, Route } from 'react-router-dom';

function ContentArea() {
    return (
        <section className="bg-gray-200 h-full ">
            <div className="bg-white p-4 m-4 rounded-2xl max-h-[900px] overflow-x-hidden">
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/empresa" element={<Empresa />} />
                    <Route path="/tipousuario" element={<TipoUsuario />} />
                    <Route path="/suscripcion" element={<Suscripcion />} />
                    <Route path="/paciente" element={<Paciente />} />
                    <Route path="/usuario" element={<Usuario />} />
                    {/* Agrega más rutas según sea necesario */}
                </Routes>
            </div>
        </section>
    )
}

export default ContentArea