import React from 'react';
import Logo from './imgs/logo.png';
import HomeSVG from './svg/HomeSVG';
import { Link } from 'react-router-dom';
import LogoutSVG from './svg/LogoutSVG';
import ActivitySVG from './svg/ActivitySVG';
import RegistersSVG from './svg/RegistersSVG';
import EmplooyesSVG from './svg/EmplooyesSVG';
import CompanySVG from './svg/CompanySVG';
import UserSVG from './svg/UserSVG';
import ContracSVG from './svg/ContracSVG';

import AuthUser from './layouts/PageAuth/AuthUser';
import Config from './layouts/PageAuth/Config';

export default function SideBar() {

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
        <div className="flex flex-col justify-between p-4 bg-white shadow-lg w-[17%] rounded border-r-1 border-gray-900/25">
            <div>

                {/* Logo */}
                <div className="mb-2 p-4 flex items-center flex-col border-b-1 border-gray-900/25">
                    <img src={Logo} alt="Logo" className="h-12" />
                </div>


                {/* Items */}
                <div className='p-4 rounded'>
                    <ul>
                        <li className="">
                            <Link to="/" className='px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center'>
                                <HomeSVG></HomeSVG>
                                <p className=' pl-4 text-[20px]'>Inicio</p>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/empresa" className='px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center'>
                                <CompanySVG></CompanySVG>
                                <p className=' pl-4 text-[20px]'>Empresa</p>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/paciente" className='px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center'>
                                <ActivitySVG></ActivitySVG>
                                <p className=' pl-4 text-[20px]'>Paciente</p>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/usuario" className='px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center'>
                                <UserSVG></UserSVG>
                                <p className=' pl-4 text-[20px]'>Usuario</p>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/tipousuario" className='px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center'>
                                <EmplooyesSVG></EmplooyesSVG>
                                <p className=' pl-4 text-[20px]'>Tipo de usuario</p>
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/suscripcion" className='px-4 mb-4 hover:bg-gray-200 p-4 rounded transition duration-300 flex items-center'>
                                <ContracSVG></ContracSVG>
                                <p className=' pl-4 text-[20px]'>Suscripcion</p>
                            </Link>
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
                            <Link onClick={logoutUser} to={"#"} className='pl-4 text-[20px] font-bold'>Cerrar Sesion</Link>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}