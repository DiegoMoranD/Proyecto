import React, { useState } from 'react';
import Logo from './imgs/logo.png';
import HomeSVG from './svg/HomeSVG';
import { Link } from 'react-router-dom';
import LogoutSVG from './svg/LogoutSVG';
import ActivitySVG from './svg/ActivitySVG';
import EmplooyesSVG from './svg/EmplooyesSVG';
import CompanySVG from './svg/CompanySVG';
import UserSVG from './svg/UserSVG';
import ContracSVG from './svg/ContracSVG';

import Config from './layouts/PageAuth/Config';
import AuthUser from './layouts/PageAuth/AuthUser';
import XSVG from './svg/X';
import { Import } from 'lucide-react';

export default function SideBar({ isOpen, toggleSidebar }) {

const { getToken, getLogout } = AuthUser();

    const logoutUser = async () => {
        try {
            const response = await Config.getLogout('/logout');
            console.log(response);
            getLogout();
        } catch (error) {

        }
    };

    return (
        <>
            {/* Fondo negro transparente */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 sm:hidden justify-end"
                >
                    <div className="absolute top-4 right-4 cursor-pointer text-white size-10" onClick={toggleSidebar}>
                        <XSVG />
                    </div>
                </div>
            )}
            <div className={`flex flex-col justify-between py-4 fixed top-0 left-0 h-full bg-white shadow-lg w-64 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:relative sm:translate-x-0`}>
                <div>
                    {/* Logo */}
                    <div className="mb-2 p-4 flex items-center flex-col border-b-1 border-gray-900/25">
                        <img src={Logo} alt="Logo" className="h-12" />
                    </div>

                    {/* Items */}
                    <div className="p-4 rounded">
                        <ul>
                            <li className="">
                                <Link to="/home" className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                    <HomeSVG />
                                    <p className="pl-4">Inicio</p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="/empresa" className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                    <CompanySVG />
                                    <p className="pl-4 ">Empresa</p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="/pacientes" className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                    <ActivitySVG />
                                    <p className="pl-4 ">Paciente</p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="/usuario" className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                    <UserSVG />
                                    <p className="pl-4 ">Usuario</p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="/tipousuario" className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                    <EmplooyesSVG />
                                    <p className="pl-4 ">Tipo de usuario</p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="/suscripcion" className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                    <ContracSVG />
                                    <p className="pl-4 ">Suscripcion</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Logout */}
                <div className="p-4 rounded w-full border-t-1 border-gray-900/25">
                    <ul>
                        <li className="">
                            <button className="bg-red-500 text-white py-3 px-8 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center w-full">
                                <LogoutSVG />
                                <Link onClick={logoutUser} to={"#"} className="pl-4  font-bold max-2xl:text-[12px] max-2xl:pl-2">
                                    Cerrar Sesion
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}