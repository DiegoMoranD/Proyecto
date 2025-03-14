import React from 'react';
import Logo from '../imgs/logo.png';
import HomeSVG from '../svg/HomeSVG';
import { Link } from 'react-router-dom';
import LogoutSVG from '../svg/LogoutSVG';
import ActivitySVG from '../svg/ActivitySVG';
import RegistersSVG from '../svg/RegistersSVG';
import EmplooyesSVG from '../svg/EmplooyesSVG';
import CompanySVG from '../svg/CompanySVG';
import UserSVG from '../svg/UserSVG';
import ContracSVG from '../svg/ContracSVG';

export default function SideBar() {
    return (
        <div className="flex flex-col justify-between p-4 bg-white shadow-lg w-[17%] rounded border-r-1 border-gray-900/25">
            <div>

                {/* Logo */}
                <div className="mb-2 p-4 flex items-center flex-col border-b-1 border-gray-900/25">
                    <img src={Logo} alt="Logo" className="h-12" />
                </div>


                {/* Items */}
                <div className='p-4 rounded'>
                    <ul>
                        <li className="mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center font-semibold">
                            <HomeSVG></HomeSVG>
                            <Link to="/" className='px-4 text-[20px]'>Inicio</Link>
                        </li>
                        <li className="mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center">
                            <CompanySVG></CompanySVG>
                            <Link to="/empresa" className='px-4 text-[20px]'>Empresa</Link>
                        </li>
                        <li className="mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center">
                            <ActivitySVG></ActivitySVG>
                            <Link to="/paciente" className='px-4 text-[20px]'>Paciente</Link>
                        </li>
                        <li className="mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center">
                            <UserSVG></UserSVG>
                            <Link to="/usuario" className='px-4 text-[20px]'>Usuario</Link>
                        </li>
                        <li className="mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center">
                            <EmplooyesSVG></EmplooyesSVG>
                            <Link to="/tipousuario" className='px-4 text-[20px]'>Tipo de usuario</Link>
                        </li>
                        <li className="mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center">
                            <ContracSVG></ContracSVG>
                            <Link to="/suscripcion" className='px-4 text-[20px]'>Suscripcion</Link>
                        </li>
                    </ul>
                </div>


            </div>
            {/* Logout */}
            <div className='p-4 rounded w-full border-t-1 border-gray-900/25'>
                <ul>
                    <li className="mb-12 mt-2">
                        <button className="bg-red-500 text-white py-3 px-8 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center w-full">
                            <LogoutSVG></LogoutSVG>
                            <Link to="/login" className='pl-4 text-[20px] font-bold'>Cerrar Sesion</Link>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}