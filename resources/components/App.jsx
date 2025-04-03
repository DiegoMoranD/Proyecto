import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoutes from './layouts/PageAuth/ProtectedRoutes';

import AdminLayout from './layouts/AdminLayout';
import ContentArea from './ContentArea';

import MedicoLayout from './layouts/MedicoLayout';

import PacienteLayout from './layouts/PacienteLayout';

import RecepcionLayout from './layouts/RecepcionLayout';

import PublicLayout from './layouts/PublicLayout';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import Recuperar from './pages/forms/Recuperar';
import SuscripcionForm from './pages/forms/SuscripcionForm';


export default function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recuperar" element={<Recuperar />} />
                    <Route path="/sus" element={<SuscripcionForm />} />
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/admin/*" element={<AdminLayout />}>
                        <Route path="home" element={<ContentArea />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path='/medico/*' element={<MedicoLayout />} >
                        <Route index element={<ContentArea />}></Route>
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path='/paciente/*' element={<PacienteLayout />} >
                        <Route index element={<ContentArea />}></Route>
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path='/recepcion/*' element={<RecepcionLayout />} >
                        <Route index element={<ContentArea />}></Route>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}