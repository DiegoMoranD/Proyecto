import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthUser from './PageAuth/AuthUser';
import SideBar from '../sideBar';
import TopBar from '../Topbar';

function AdminLayout() {
    const { getRol } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (getRol() !== 'admin') {
            navigate('/'); // Redirige si el rol no es "admin"
        }
    }, []);

    return (
        <main className="flex w-screen h-screen bg-gray-200 fixed">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <Outlet /> {/* Renderiza las subrutas aquí */}
            </div>
        </main>
    );
}

export default AdminLayout;