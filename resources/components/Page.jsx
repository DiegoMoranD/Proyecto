import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './SideBar';
import TopBar from './Topbar';
import Login from './pages/Login';
import ContentArea from './ContentArea';

export default function App() {

    return (
        <Router>
            <main className="flex w-screen  h-screen bg-gray-200 fixed">
                    <SideBar />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <ContentArea />
                </div>
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