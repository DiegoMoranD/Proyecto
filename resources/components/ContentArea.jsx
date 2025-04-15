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

function ContentArea() {
    return (
        <section className="bg-gray-200 h-full">
            <div className="bg-white p-4 m-4 rounded-2xl max-h-[900px] overflow-x-hidden lg:max-w-[80%] md:max-w-[90%] sm:max-w-full mx-auto max-lg:bg-amber-300 max-sm:w-[0px]">
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