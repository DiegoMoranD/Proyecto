import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import ProtectedRoutes from "./layouts/PageAuth/ProtectedRoutes";

import AdminLayout from "./layouts/AdminLayout";
import ContentArea from "./ContentArea";

import MedicoLayout from "./layouts/MedicoLayout";

import PacienteLayout from "./layouts/PacienteLayout";

import RecepcionLayout from "./layouts/RecepcionLayout";

import RootLayout from "./layouts/RootLayout";

import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import RecuperarToken from "./pages/forms/RecuperarToken";
import SuscripcionForm from "./pages/forms/SuscripcionForm";
import ActivateEmpresa from "./pages/forms/ActivateEmpresa";
import NewPassword from "./pages/forms/NewPassword";
import UpdatePassword from "./pages/forms/UpdatePassword";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recuperar-token" element={<RecuperarToken />} />
                    <Route path="/suscripcion" element={<SuscripcionForm />} />
                    <Route path="/activar-empresa/:token" element={<ActivateEmpresa />} />
                    <Route path="/new-password/:token" element={<NewPassword />} />
                    <Route path="/recuperar-cuenta" element={<UpdatePassword />} />
                </Route>

                {/* <Route path="/" element={<PublicLayout />}>
                    <Route path="/*" element={<ContentArea />} />
                </Route> */}

                <Route element={<ProtectedRoutes />}>
                    <Route path="/root/*" element={<RootLayout />}>
                        <Route path="home" element={<ContentArea />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/admin/*" element={<AdminLayout />}>
                        <Route path="home" element={<ContentArea />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/medico/*" element={<MedicoLayout />}>
                        <Route index element={<ContentArea />}></Route>
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/paciente/*" element={<PacienteLayout />}>
                        <Route index element={<ContentArea />}></Route>
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route path="/recepcion/*" element={<RecepcionLayout />}>
                        <Route index element={<ContentArea />}></Route>
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}