import BurgerMenu from "./svg/BurgerMenu";
import React from 'react';

export default function TopBar({ toggleSidebar }) {
    // Obtén el usuario desde sessionStorage
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return (
        <header className="bg-white h-16 border-gray-900/25 border-b max-h-16 min-h-16 px-4 flex items-center justify-between sm:justify-end">
            <div className="flex items-center sm:hidden">
                <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <BurgerMenu />
                </button>
            </div>
            <div className="flex items-center">
                
                <div className="text-[14px] font-[600] mr-11">
                    {user ? [user.name, "  ", user.paterno] : "Cargando..."}
                </div>
            </div>
        </header>
    );
}