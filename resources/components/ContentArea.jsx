import React from "react";
import Home from "./pages/Home";
import Empresa from "./pages/Empresa";
import Usuario from "./pages/Usuario";
import Paciente from "./pages/Paciente";
import Suscripcion from "./pages/Suscripcion";
import TipoUsuario from "./pages/TipoUsuario";
import { Routes, Route } from "react-router-dom";

function ContentArea() {
    return (
        <section className="flex-1 overflow-y-auto bg-gray-200">
            <div className="bg-white p-4 m-4 rounded-2xl overflow-x-hidden lg:max-w-[95%] md:max-w-[95%] sm:max-w-full mx-auto max-sm:w-fixed max-lg:w-full">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/empresa" element={<Empresa />} />
                    <Route path="/tipousuario" element={<TipoUsuario />} />
                    <Route path="/suscripcion" element={<Suscripcion />} />
                    <Route path="/pacientes" element={<Paciente />} />
                    <Route path="/usuario" element={<Usuario />} />
                </Routes>
            </div>
        </section>
    );
}

export default ContentArea;