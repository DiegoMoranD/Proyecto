import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './sideBar';
import TopBar from './Topbar';
import ContentArea from './ContentArea';

import CreateEmpresa from './pages/forms/CreateEmpresa';
import PacientesForm from './pages/forms/PacientesForm';
import SuscripcionForm from './pages/forms/SuscripcionForm';
import TipoUsuarioForm from './pages/forms/TipoUsuarioForm';
import UsuarioForm from './pages/forms/UsuarioFrom';
import Login from './pages/forms/Login';
import PublicLayout from './layouts/PublicLayout';

export default function App() {

    return (
        <Router>

            <Routes path="/login" element={<PublicLayout/>}>
                <Route></Route>
            </Routes>
            
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