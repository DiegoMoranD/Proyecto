import React, { useState, useEffect } from 'react';
import AuthUser from '../../layouts/PageAuth/AuthUser';
import { useNavigate } from 'react-router-dom';
import Config from '../../layouts/PageAuth/Config';
import axios from 'axios';

function Login() {
    const { getToken, setToken } = AuthUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); // Estado para manejar errores
    const [showPassword, setShowPassword] = useState(false);

    const isFormValid = email.trim() !== '' && password.trim() !== '';

    useEffect(() => {
        if (getToken()) {
            const rol = sessionStorage.getItem('rol') ? JSON.parse(sessionStorage.getItem('rol')) : null;
            if (rol === 'root') {
                navigate('/root/home');
            } else if (rol === 'admin') {
                navigate('/admin/home');
            } else if (rol === 'medico') {
                navigate('/medico/home');
            } else if (rol === 'paciente') {
                navigate('/paciente/home');
            } else if (rol === 'recepcion') {
                navigate('/recepcion/home');
            }
        }
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'El correo es requerido';
        if (!password) newErrors.password = 'La contraseña es requerida';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
    };

    const submitLogin = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        try {
            const { data } = await Config.getLogin({ email, password });

            if (data.success) {
                const userRol = data.user.roles[0].name;
                setToken(data.user, data.token, userRol);

                if (rol === 'root') {
                    navigate('/root/home');
                } else if (userRol === 'admin') {
                    navigate('/admin/home');
                } else if (userRol === 'medico') {
                    navigate('/medico/home');
                } else if (userRol === 'paciente') {
                    navigate('/paciente/home');
                } else if (userRol === 'recepcion') {
                    navigate('/recepcion/home');
                } else {
                    setMessage('Rol no reconocido');
                }
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            if (error.response) {
                // Si hay errores de validación
                if (error.response.status === 422 && error.response.data.error) {
                    // Muestra el primer error de validación
                    const firstError = Object.values(error.response.data.error)[0][0];
                    setMessage(firstError);
                } else if (error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('Error al iniciar sesión');
                }
            } else {
                setMessage('Error de conexión con el servidor');
            }
        }
    };

    return (
        <>
            <div className="bg-[#dbdbdb] text-black h-screen flex justify-center items-center w-full">
                <div className="w-full max-w-md px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#fff] border border-[#e11a31] rounded-2xl p-6 sm:p-12 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                        <h1 className="text-2xl sm:text-4xl text-black font-bold text-center mb-4 sm:mb-6 py-2 sm:py-4">
                            Iniciar sesión
                        </h1>
                        <form onSubmit={submitLogin}>
                            {/* Campo de Email */}
                            <div className="relative my-4 sm:my-8">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`block w-full py-2 sm:py-2.5 px-0 text-sm sm:text-base text-black bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`}
                                    placeholder=""
                                />
                                <label
                                    htmlFor=""
                                    className="absolute text-sm sm:text-base text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email
                                </label>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Campo de Contraseña */}
                            <div className="relative my-4 sm:my-8">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`block w-full py-2 sm:py-2.5 px-0 text-sm sm:text-base text-black bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        } appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer`}
                                    placeholder=""
                                />
                                <label
                                    htmlFor=""
                                    className="absolute text-sm sm:text-base text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Contraseña
                                </label>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Mensaje de error general */}
                            {message && (
                                <p className="text-red-500 text-center mb-4">{message}</p>
                            )}
                            <div className="flex flex-col sm:flex-row justify-between items-center my-4">
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="checkbox" id="showPassword"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)} />
                                    <label htmlFor="showPassword">Mostrar contraseña</label>
                                </div>
                                <p className='text-sm sm:text-base text-end'>
                                    ¿Olvidaste tu <a href="/recuperar-cuenta" className='text-blue-500 hover:text-cyan-400 cursor-pointer mt-2 sm:mt-0 text-end transition duration-500'>contraseña</a> o expiro el <a href="/recuperar-token" className='text-blue-500 hover:text-cyan-400 cursor-pointer mt-2 sm:mt-0 text-end transition duration-500'>token</a>?
                                </p>
                            </div>
                            <button
                                onClick={submitLogin}
                                type="submit"
                                disabled={!isFormValid}
                                className={`font-medium text-black w-full mb-6 text-sm sm:text-[18px] my-4 sm:my-6 rounded-full ${isFormValid
                                    ? 'bg-slate-300 hover:bg-[#e11a31] hover:text-white cursor-pointer'
                                    : 'bg-gray-300 cursor-not-allowed'
                                    } py-2 transition-colors duration-300`}
                            >
                                Iniciar sesión
                            </button>
                            <div>
                                <span className="text-sm sm:text-base">
                                    No tienes una cuenta?{' '}
                                    <a
                                        className="text-blue-500 hover:text-cyan-400 cursor-pointer"
                                        href="/register"
                                    >
                                        Crea una cuenta
                                    </a>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>ç
        </>
    );
}

export default Login;