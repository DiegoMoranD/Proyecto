import React, { useState } from 'react';
import Logo from './imgs/logo2.png';
import HomeSVG from './svg/HomeSVG';
import { Link } from 'react-router-dom';
import LogoutSVG from './svg/LogoutSVG';
import EmplooyesSVG from './svg/EmplooyesSVG';
import CompanySVG from './svg/CompanySVG';
import UserSVG from './svg/UserSVG';
import ContracSVG from './svg/ContracSVG';

import Config from './layouts/PageAuth/Config';
import AuthUser from './layouts/PageAuth/AuthUser';
import XSVG from './svg/X';

import { House, Calendar1, Activity, PillBottle, Cross } from 'lucide-react';

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

    const getRol = () => {
        const rol = sessionStorage.getItem('rol');
        return rol ? JSON.parse(rol) : null;
    }

    const rol = getRol();

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
            <div className={`flex flex-col justify-between fixed top-0 left-0 h-full bg-white shadow-lg w-64 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:relative sm:translate-x-0`}>
                <div>
                    {/* Logo */}
                    {/* <div className="mb-2 p-4 flex items-center flex-col border-b border-gray-900/25">
                        <img src={Logo} alt="Logo" className="h-[63px]" />
                    </div> */}

                    <div className="mb-2 p-4 flex items-center justify-center border-b border-gray-900/25">
                        <Cross className='bg-blue-500 text-white size-12 m-1 p-2 rounded-xl'/>
                        <div className='ml-2'>
                            <p className='text-2xl font-bold'>MEDIC</p>
                            <span className='font-semibold text-blue-500 text-xl'>TRACK</span>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="p-4 rounded">
                        <ul>
                            <>
                                {(rol === 'admin' || rol === 'root') && (
                                    <>
                                        <li>
                                            <Link to={`/${rol}/home`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <HomeSVG />
                                                <p className="pl-4 font-medium">Inicio</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/${rol}/usuario`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <UserSVG />
                                                <p className="pl-4 font-medium">Usuario</p>
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {(rol === 'medico' || rol === 'recepcion') && (
                                    <>
                                        <li>
                                            <Link to={`/${rol}/home`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <House />
                                                <p className="pl-4 font-medium">Inicio</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/${rol}/agenda`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <Calendar1 />
                                                <p className="pl-4 font-medium">Ver Citas</p>
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {(rol === 'admin' || rol === 'root' || rol === 'paciente') && (
                                    <>
                                        <li>
                                            <Link to={`/${rol}/empresa`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <CompanySVG />
                                                <p className="pl-4 font-medium">Empresa</p>
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {(rol === 'paciente') && (
                                    <>
                                        <li>
                                            <Link to={`/${rol}/usuario-data`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <UserSVG />
                                                <p className="pl-4 font-medium">Mis datos</p>
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {(rol === 'admin' || rol === 'root') && (
                                    <>
                                        <li>
                                            <Link to={`/${rol}/tipo-usuario`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <EmplooyesSVG />
                                                <p className="pl-4 font-medium">Tipo de usuario</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/${rol}/suscripcion`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                                <ContracSVG />
                                                <p className="pl-4 font-medium">Suscripción</p>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>


                            {(rol === 'medico' || rol === 'recepcion' || rol === 'admin' || rol === 'root') && (

                                <>
                                    <li className="">
                                        <Link to={`/${rol}/pacientes`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                            <Activity />
                                            <p className="pl-4 font-medium ">Ver Pacientes</p>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to={`/${rol}/medicamentos`} className="px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center max-2xl:p-2">
                                            <PillBottle />
                                            <p className="pl-4 font-medium ">Medicamentos</p>
                                        </Link>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
                {/* Logout */}
                <div className="p-4 rounded w-full border-t-1 border-gray-900/25 flex justify-center">
                    <ul>
                        <li className="">
                            <button onClick={logoutUser} className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center w-auto cursor-pointer">
                                <LogoutSVG />
                                <Link  to={"#"} className="pl-4 font-bold max-2xl:text-[12px] max-2xl:pl-2">
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