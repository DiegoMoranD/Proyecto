import React from 'react';

export default function SideBar() {
    return (
        <div className="flex flex-col justify-between p-4 bg-white shadow-lg w-[18%] rounded">
            <div>
                {/* Logo */}
                <div className="mb-8">
                    <img src="logo.png" alt="Logo" className="h-12 w-12" />
                </div>
                {/* Items */}
                <ul>
                    <li className="mb-4"> 
                        Usuarios
                    </li>
                    <li className="mb-4">Registros</li>
                    <li className="mb-4">Actividad</li>
                </ul>
            </div>
            {/* Logout */}
            <div>
                <button className="bg-red-500 text-white py-2 px-4 rounded"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                    Logout</button>
            </div>
        </div>
    );
}