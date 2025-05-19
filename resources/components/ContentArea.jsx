import React from "react";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Empresa from "./pages/Empresa";
import Usuario from "./pages/Usuario";
import Paciente from "./pages/Paciente";
import CreateForm from "./pages/CreateForm";
import Suscripcion from "./pages/Suscripcion";
import TipoUsuario from "./pages/TipoUsuario";
import { Routes, Route } from "react-router-dom";
import PacienteForm from './pages/forms/PacientesForm'
import RecepcionForm from './pages/forms/RecepcionForm'

function ContentArea() {
    return (
        <section className="bg-gray-200 h-full">
            <div className="bg-white p-4 m-4 rounded-2xl overflow-x-hidden lg:max-w-[95%] md:max-w-[95%] sm:max-w-full mx-auto max-sm:w-fixed max-lg:w-full">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/empresa" element={<Empresa />} />
                    <Route path="/tipousuario" element={<TipoUsuario />} />
                    <Route path="/suscripcion" element={<Suscripcion />} />
                    <Route path="/pacientes" element={<Paciente />} />
                    <Route path="/usuario" element={<Usuario />} />
                    <Route path="/Paciente-form" element={<PacienteForm />} />
                    <Route path="/Recepcion-form" element={<RecepcionForm />} />
                </Routes>
            </div>
        </section>
    );
}

export default ContentArea;