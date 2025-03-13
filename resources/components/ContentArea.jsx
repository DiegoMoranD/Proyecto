import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Activity from './pages/Activity';
import Register from './pages/Register';
import Login from './pages/Login';

function ContentArea() {
    return (
        <section className="bg-gray-200 h-full">
            <div className="bg-white p-4 m-4 rounded-2xl overflow-scroll">
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/register" element={<Register />} />
                    {/* Agrega más rutas según sea necesario */}
                </Routes>
            </div>
        </section>
    )
}

export default ContentArea