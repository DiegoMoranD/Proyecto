import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Activity from './pages/Activity';

function ContentArea() {
    return (
        <section className="bg-orange-300 h-full">
            <div className="bg-white p-4 m-4 rounded-2xl">
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/activity" element={<Activity />} />
                    {/* Agrega más rutas según sea necesario */}
                </Routes>
            </div>
        </section>
    )
}

export default ContentArea