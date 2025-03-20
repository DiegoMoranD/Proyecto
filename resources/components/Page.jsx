import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './Topbar';
import ContentArea from './ContentArea';

import CreateEmpresa from './pages/forms/CreateEmpresa';
import PacientesForm from './pages/forms/PacientesForm';
import SuscripcionForm from './pages/forms/SuscripcionForm';
import TipoUsuarioForm from './pages/forms/TipoUsuarioForm';
import UsuarioForm from './pages/forms/UsuarioFrom';
import Login from './pages/forms/Login';

export default function App() {

    return (
        <Router>
            <main className="flex w-screen  h-screen bg-gray-200 fixed">
                    {/* <SideBar />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <ContentArea />
                </div> */}

                        <Login></Login>
                
                {/* <CreateEmpresa></CreateEmpresa> */}

                {/* <PacientesForm></PacientesForm> */}

                {/* <SuscripcionForm></SuscripcionForm> */}

                {/* <TipoUsuarioForm></TipoUsuarioForm> */}

                {/* <UsuarioForm></UsuarioForm> */}
            </main>
        </Router>


        // <Router>
        //     <Routes>
        //         {/* Ruta para el login */}
        //         <Route path="/login" element={<Login />} />

        //         {/* Rutas protegidas */}
        //         {isAuthenticated ? (
        //             <Route
        //                 path="/*"
        //                 element={
        //                     <div className="flex">
        //                         <SideBar />
        //                         <ContentArea />
        //                     </div>
        //                 }
        //             />
        //         ) : (
        //             <Route path="/*" element={<Navigate to="/login" />} />
        //         )}
        //     </Routes>
        // </Router>
    );
}